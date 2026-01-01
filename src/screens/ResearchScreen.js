import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Share as RNShare,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { colors, typography, spacing, layout } from '../utils/theme';
import {
  getResearchCollection,
  deleteResearchEntry,
  shareResearchCollection,
  getResearchStats,
} from '../utils/researchStorage';
import * as Clipboard from 'expo-clipboard';

const ResearchScreen = ({ navigation, selectedCiphers, setSelectedCiphers }) => {
  const [research, setResearch] = useState([]);
  const [expandedIds, setExpandedIds] = useState(new Set());
  const [stats, setStats] = useState(null);

  // Load research when screen is focused
  useFocusEffect(
    useCallback(() => {
      loadResearch();
    }, [])
  );

  const loadResearch = async () => {
    const data = await getResearchCollection();
    setResearch(data);
    const statsData = await getResearchStats();
    setStats(statsData);
  };

  const handleDelete = (id) => {
    Alert.alert(
      'Delete Entry',
      'Are you sure you want to delete this research entry?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteResearchEntry(id);
            loadResearch();
          },
        },
      ]
    );
  };

  const handleDeleteAll = () => {
    Alert.alert(
      'Delete All',
      'Are you sure you want to delete ALL research entries? This cannot be undone!',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete All',
          style: 'destructive',
          onPress: () => {
            AsyncStorage.removeItem('gematria_research_collection');
            loadResearch();
          },
        },
      ]
    );
  };

  const toggleExpand = (id) => {
    const newExpanded = new Set(expandedIds);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedIds(newExpanded);
  };

  const handleLoad = (entry) => {
    // Update selected ciphers
    setSelectedCiphers(entry.selectedCiphers);

    // Navigate to Calculator with the text
    navigation.navigate('Calculator', {
      loadedText: entry.text,
      loadedCiphers: entry.selectedCiphers
    });
  };

  const handleShareCollection = async () => {
    if (research.length === 0) {
      Alert.alert('No Research', 'No research to share');
      return;
    }

    const encoded = shareResearchCollection(research);
    const baseUrl = 'https://gematriacalculator.xyz'; // Your production domain
    const url = `${baseUrl}?collection=${encoded}`;

    try {
      // Show loading state
      Alert.alert('Shortening URL...', 'Please wait');

      // Shorten the URL using is.gd
      const shortenedUrl = await shortenUrl(url);

      // Try native share first with shortened URL
      await RNShare.share({
        message: `Check out my Gematria research collection: ${shortenedUrl}`,
        url: shortenedUrl,
        title: 'Share Research Collection',
      });
    } catch (error) {
      // Fallback to clipboard with shortened URL
      try {
        // Try to shorten even in fallback
        const shortenedUrl = await shortenUrl(url);
        await Clipboard.setStringAsync(shortenedUrl);
        Alert.alert('Link Copied', `Short link copied to clipboard!\n\n${shortenedUrl}`);
      } catch (clipError) {
        // Last resort - use full URL
        await Clipboard.setStringAsync(url);
        Alert.alert('Link Copied', 'Link copied to clipboard!');
      }
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTopCiphers = (entry) => {
    if (!entry.results || entry.results.length === 0) {
      return [];
    }

    return entry.results
      .filter(r => r && r.totalValue !== undefined)
      .sort((a, b) => b.totalValue - a.totalValue)
      .slice(0, 3)
      .map(r => ({ name: r.name, value: r.totalValue }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Research List</Text>
          {stats && (
            <View>
              <Text style={styles.subtitle}>
                {stats.totalEntries} of {stats.maxEntries} entries ({stats.percentFull}% full)
              </Text>
              {stats.percentFull >= 80 && (
                <Text style={styles.warningText}>
                  ⚠️ Storage is {stats.percentFull}% full
                </Text>
              )}
            </View>
          )}
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.shareButton}
            onPress={handleShareCollection}
          >
            <Text style={styles.buttonText}>📤 Share All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteAllButton}
            onPress={handleDeleteAll}
          >
            <Text style={styles.buttonText}>🗑️ Delete All</Text>
          </TouchableOpacity>
        </View>

        {/* Research List */}
        <ScrollView style={styles.list}>
          {research.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>📝</Text>
              <Text style={styles.emptyText}>No research saved yet</Text>
              <Text style={styles.emptySubtext}>
                Go to Calculator and tap "Save to Research" to start building your collection
              </Text>
            </View>
          ) : (
            research.map((entry) => {
              const isExpanded = expandedIds.has(entry.id);
              const topCiphers = getTopCiphers(entry);

              return (
                <View key={entry.id} style={styles.entryCard}>
                  {/* Header */}
                  <TouchableOpacity
                    style={styles.entryHeader}
                    onPress={() => toggleExpand(entry.id)}
                  >
                    <View style={styles.entryHeaderLeft}>
                      <Text style={styles.entryText} numberOfLines={2}>
                        "{entry.text}"
                      </Text>
                      <Text style={styles.entryDate}>{formatDate(entry.timestamp)}</Text>
                    </View>
                    <View style={styles.entryHeaderRight}>
                      <Text style={styles.expandIcon}>{isExpanded ? '▼' : '▶'}</Text>
                    </View>
                  </TouchableOpacity>

                  {/* Quick View - Top 3 */}
                  {topCiphers.length > 0 && (
                    <View style={styles.quickResults}>
                      {topCiphers.map((cipher, idx) => (
                        <View key={idx} style={styles.quickResultItem}>
                          <Text style={styles.quickResultName}>{cipher.name}</Text>
                          <Text style={styles.quickResultValue}>{cipher.value}</Text>
                        </View>
                      ))}
                    </View>
                  )}

                  {/* Expanded View */}
                  {isExpanded && entry.results && entry.results.length > 0 && (
                    <View style={styles.expandedContent}>
                      <Text style={styles.expandedTitle}>
                        All Results ({entry.results.length})
                      </Text>
                      <ScrollView
                        style={styles.detailedResults}
                        nestedScrollEnabled
                      >
                        {entry.results.map((result, idx) => (
                          <View key={idx} style={styles.detailedResultItem}>
                            <View style={styles.detailedResultHeader}>
                              <Text style={styles.detailedResultName}>
                                {result.name}
                              </Text>
                              <Text style={styles.detailedResultValue}>
                                {result.totalValue}
                              </Text>
                            </View>
                          </View>
                        ))}
                      </ScrollView>
                    </View>
                  )}

                  {/* Actions */}
                  <View style={styles.entryActions}>
                    <TouchableOpacity
                      style={styles.entryActionButton}
                      onPress={() => handleLoad(entry)}
                    >
                      <Text style={styles.entryActionText}>📥 Load</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.entryActionButton, styles.deleteButton]}
                      onPress={() => handleDelete(entry.id)}
                    >
                      <Text style={styles.entryActionText}>🗑️ Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })
          )}
        </ScrollView>

        {research.length === 0 && (
          <View style={styles.emptyHint}>
            <Text style={styles.emptyHintText}>
              💡 Tap "Save to Research" in Calculator to start
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: typography.fontSize.xlarge,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.fontSize.small,
    color: colors.lightText,
  },
  warningText: {
    fontSize: typography.fontSize.small,
    color: '#e67e22',
    marginTop: spacing.xs,
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    padding: spacing.md,
    gap: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  shareButton: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: layout.borderRadius.medium,
    alignItems: 'center',
  },
  deleteAllButton: {
    flex: 1,
    backgroundColor: '#e74c3c',
    padding: spacing.md,
    borderRadius: layout.borderRadius.medium,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: typography.fontSize.medium,
    fontWeight: '600',
  },
  list: {
    flex: 1,
    padding: spacing.md,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl * 2,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: spacing.lg,
  },
  emptyText: {
    fontSize: typography.fontSize.large,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  emptySubtext: {
    fontSize: typography.fontSize.medium,
    color: colors.lightText,
    textAlign: 'center',
    maxWidth: 300,
    lineHeight: 22,
  },
  entryCard: {
    backgroundColor: colors.white,
    borderRadius: layout.borderRadius.medium,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      }
    }),
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.md,
    backgroundColor: '#fafafa',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  entryHeaderLeft: {
    flex: 1,
  },
  entryText: {
    fontSize: typography.fontSize.medium,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  entryDate: {
    fontSize: typography.fontSize.small,
    color: colors.lightText,
  },
  entryHeaderRight: {
    justifyContent: 'center',
    paddingLeft: spacing.md,
  },
  expandIcon: {
    fontSize: 14,
    color: colors.lightText,
  },
  quickResults: {
    flexDirection: 'row',
    padding: spacing.md,
    gap: spacing.sm,
  },
  quickResultItem: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: spacing.md,
    borderRadius: layout.borderRadius.small,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  quickResultName: {
    fontSize: typography.fontSize.xsmall,
    color: colors.lightText,
    marginBottom: spacing.xs,
  },
  quickResultValue: {
    fontSize: typography.fontSize.large,
    fontWeight: 'bold',
    color: colors.text,
  },
  expandedContent: {
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: '#fafafa',
  },
  expandedTitle: {
    fontSize: typography.fontSize.medium,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  detailedResults: {
    maxHeight: 300,
  },
  detailedResultItem: {
    backgroundColor: colors.white,
    padding: spacing.sm,
    borderRadius: layout.borderRadius.small,
    marginBottom: spacing.sm,
    borderLeftWidth: 2,
    borderLeftColor: colors.primary,
  },
  detailedResultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailedResultName: {
    fontSize: typography.fontSize.small,
    fontWeight: '600',
    color: colors.text,
  },
  detailedResultValue: {
    fontSize: typography.fontSize.medium,
    fontWeight: 'bold',
    color: colors.primary,
  },
  entryActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  entryActionButton: {
    flex: 1,
    padding: spacing.md,
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  deleteButton: {
    borderLeftWidth: 1,
    borderLeftColor: colors.border,
  },
  entryActionText: {
    fontSize: typography.fontSize.medium,
    fontWeight: '600',
    color: colors.text,
  },
  emptyHint: {
    padding: spacing.lg,
    margin: spacing.md,
    backgroundColor: '#fff9e6',
    borderRadius: layout.borderRadius.medium,
    borderWidth: 1,
    borderColor: '#ffe066',
  },
  emptyHintText: {
    color: '#856404',
    fontSize: typography.fontSize.medium,
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default ResearchScreen;
