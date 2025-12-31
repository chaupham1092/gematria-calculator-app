import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Share as RNShare,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import * as Clipboard from 'expo-clipboard';
import { useRouter } from 'expo-router';

const STORAGE_KEY = 'gematria_research_collection';
const MAX_ENTRIES = 100;

export default function ResearchTab() {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const loadData = async () => {
    setLoading(true);
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setData(Array.isArray(parsed) ? parsed : []);
      } else {
        setData([]);
      }
    } catch (e) {
      console.log('Load error:', e);
      setData([]);
    }
    setLoading(false);
  };

  const handleDelete = (id: string) => {
    Alert.alert('Delete Entry', 'Delete this research entry?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          const filtered = data.filter(item => item.id !== id);
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
          setData(filtered);
        },
      },
    ]);
  };

  const handleDeleteAll = () => {
    Alert.alert('Delete All', 'Delete ALL research entries?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete All',
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.removeItem(STORAGE_KEY);
          setData([]);
        },
      },
    ]);
  };

  const toggleExpand = (id: string) => {
    const newSet = new Set(expanded);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setExpanded(newSet);
  };

  const handleLoad = (entry: any) => {
    // Navigate to calculator with loaded data
    router.push('/');
  };

  const handleShare = async () => {
    if (data.length === 0) {
      Alert.alert('No Research', 'Nothing to share');
      return;
    }
    try {
      const shareData = {
        type: 'collection',
        entries: data.map(e => ({
          text: e.text,
          ciphers: e.selectedCiphers ? Object.keys(e.selectedCiphers).filter(k => e.selectedCiphers[k]) : [],
          note: e.note || '',
          tags: e.tags || []
        }))
      };
      const json = JSON.stringify(shareData);
      const base64 = btoa(unescape(encodeURIComponent(json)));
      const encoded = base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
      const url = `https://gematriacalculator.xyz?collection=${encoded}`;
      
      await RNShare.share({
        message: `Check out my Gematria research: ${url}`,
        url: url,
        title: 'Share Research',
      });
    } catch (e) {
      try {
        await Clipboard.setStringAsync(url);
        Alert.alert('Copied', 'Link copied to clipboard');
      } catch (e2) {
        Alert.alert('Error', 'Could not share');
      }
    }
  };

  const formatDate = (ts: number) => {
    const d = new Date(ts);
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getTopResults = (entry: any) => {
    if (!entry.results || !Array.isArray(entry.results)) return [];
    return entry.results
      .filter((r: any) => r && r.totalValue !== undefined)
      .sort((a: any, b: any) => b.totalValue - a.totalValue)
      .slice(0, 3);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.centerBox}>
          <ActivityIndicator size="large" color="#3498db" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Research List</Text>
          <Text style={styles.subtitle}>{data.length} of {MAX_ENTRIES} entries</Text>
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity style={styles.shareBtn} onPress={handleShare}>
            <Text style={styles.btnText}>📤 Share All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteAllBtn} onPress={handleDeleteAll}>
            <Text style={styles.btnText}>🗑️ Delete All</Text>
          </TouchableOpacity>
        </View>

        {data.length === 0 ? (
          <View style={styles.centerBox}>
            <Text style={styles.emptyIcon}>📝</Text>
            <Text style={styles.emptyTitle}>No research saved yet</Text>
            <Text style={styles.emptyDesc}>
              Go to Calculator and tap "Save to Research" to start
            </Text>
          </View>
        ) : (
          <ScrollView style={styles.list}>
            {data.map((entry: any) => {
              if (!entry || !entry.id) return null;
              
              const isExpanded = expanded.has(entry.id);
              const topResults = getTopResults(entry);

              return (
                <View key={entry.id} style={styles.card}>
                  <TouchableOpacity style={styles.cardHeader} onPress={() => toggleExpand(entry.id)}>
                    <View style={styles.cardHeaderLeft}>
                      <Text style={styles.cardText} numberOfLines={2}>"{entry.text}"</Text>
                      <Text style={styles.cardDate}>{formatDate(entry.timestamp)}</Text>
                    </View>
                    <Text style={styles.arrow}>{isExpanded ? '▼' : '▶'}</Text>
                  </TouchableOpacity>

                  {topResults.length > 0 && (
                    <View style={styles.quickView}>
                      {topResults.map((r: any, i: number) => (
                        <View key={i} style={styles.quickItem}>
                          <Text style={styles.quickName}>{r.name}</Text>
                          <Text style={styles.quickValue}>{r.totalValue}</Text>
                        </View>
                      ))}
                    </View>
                  )}

                  {isExpanded && entry.results && Array.isArray(entry.results) && (
                    <View style={styles.expandedView}>
                      <Text style={styles.expandedTitle}>All Results ({entry.results.length})</Text>
                      {entry.results.map((r: any, i: number) => (
                        <View key={i} style={styles.resultRow}>
                          <Text style={styles.resultName}>{r.name}</Text>
                          <Text style={styles.resultValue}>{r.totalValue}</Text>
                        </View>
                      ))}
                    </View>
                  )}

                  <View style={styles.cardActions}>
                    <TouchableOpacity style={styles.actionBtn} onPress={() => handleLoad(entry)}>
                      <Text style={styles.actionText}>📥 Load</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.actionBtn, styles.deleteBtn]} onPress={() => handleDelete(entry.id)}>
                      <Text style={styles.actionText}>🗑️ Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  subtitle: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 4,
  },
  buttons: {
    flexDirection: 'row',
    padding: 12,
    gap: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  shareBtn: {
    flex: 1,
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteAllBtn: {
    flex: 1,
    backgroundColor: '#e74c3c',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  list: {
    flex: 1,
    padding: 12,
  },
  centerBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#7f8c8d',
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  emptyDesc: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    maxWidth: 280,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fafafa',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  cardHeaderLeft: {
    flex: 1,
  },
  cardText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  cardDate: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 4,
  },
  arrow: {
    fontSize: 14,
    color: '#7f8c8d',
    marginLeft: 12,
  },
  quickView: {
    flexDirection: 'row',
    padding: 12,
    gap: 8,
  },
  quickItem: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 8,
    borderRadius: 6,
    borderLeftWidth: 3,
    borderLeftColor: '#3498db',
  },
  quickName: {
    fontSize: 11,
    color: '#7f8c8d',
  },
  quickValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  expandedView: {
    padding: 12,
    backgroundColor: '#fafafa',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  expandedTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 6,
    marginBottom: 4,
    borderLeftWidth: 2,
    borderLeftColor: '#3498db',
  },
  resultName: {
    fontSize: 14,
    color: '#2c3e50',
  },
  resultValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3498db',
  },
  cardActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  actionBtn: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
  },
  deleteBtn: {
    borderLeftWidth: 1,
    borderLeftColor: '#e0e0e0',
  },
  actionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
});
