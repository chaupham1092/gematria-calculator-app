import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import {
  getResearchCollection,
  deleteResearchEntry,
  shareResearchCollection,
  getResearchStats
} from '../../utils/researchStorage';
import { copyToClipboard, shortenUrl } from '../../utils/shareUtils';

export default function ResearchCollection({ 
  currentText, 
  currentCiphers, 
  currentResults,
  onLoadResearch 
}) {
  const [research, setResearch] = useState([]);
  const [expandedIds, setExpandedIds] = useState(new Set());
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadResearch();
  }, []);

  const loadResearch = async () => {
    const data = await getResearchCollection();
    setResearch(data);
    const statsData = await getResearchStats();
    setStats(statsData);
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this research entry?')) {
      await deleteResearchEntry(id);
      loadResearch();
    }
  };

  const handleDeleteAll = async () => {
    if (confirm('Delete ALL research entries? This cannot be undone!')) {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('gematria_research_collection');
      }
      loadResearch();
    }
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
    onLoadResearch(entry.text, entry.selectedCiphers);
  };

  const handleShareCollection = async () => {
    if (research.length === 0) {
      alert('No research to share');
      return;
    }

    const encoded = shareResearchCollection(research);
    const baseUrl = window.location.origin;
    const longUrl = `${baseUrl}?collection=${encoded}`;
    
    // Show loading state
    const originalButton = document.activeElement;
    if (originalButton) {
      originalButton.textContent = '⏳ Shortening...';
      originalButton.disabled = true;
    }
    
    // Shorten the URL using is.gd via Netlify function
    const shortUrl = await shortenUrl(longUrl);
    
    // Copy to clipboard
    const success = await copyToClipboard(shortUrl);
    
    // Restore button
    if (originalButton) {
      originalButton.textContent = '📤 Share All';
      originalButton.disabled = false;
    }
    
    if (success) {
      alert(`Short link copied to clipboard!\n\n${shortUrl}\n\nShare this link to share your entire research collection.`);
    } else {
      alert('Failed to copy link. URL: ' + shortUrl);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getTopCiphers = (entry) => {
    // Safety check - make sure results exist and have values
    if (!entry.results || entry.results.length === 0) {
      return [];
    }
    
    return entry.results
      .filter(r => r && r.totalValue !== undefined) // Filter out invalid results
      .sort((a, b) => b.totalValue - a.totalValue)
      .slice(0, 3)
      .map(r => ({ name: r.name, value: r.totalValue }));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Research List</Text>
          {stats && (
            <View>
              <Text style={styles.subtitle}>
                {stats.totalEntries} of {stats.maxEntries} entries ({stats.percentFull}% full) • {stats.totalWords} words
              </Text>
              {stats.percentFull >= 80 && (
                <Text style={styles.warningText}>
                  ⚠️ Storage is {stats.percentFull}% full. Consider deleting old entries.
                </Text>
              )}
            </View>
          )}
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={handleShareCollection}>
          <Text style={styles.actionButtonText}>📤 Share All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.deleteAllButton]} onPress={handleDeleteAll}>
          <Text style={styles.actionButtonText}>🗑️ Delete All</Text>
        </TouchableOpacity>
      </View>

      {/* Research List */}
      <ScrollView style={styles.list}>
        {research.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📝</Text>
            <Text style={styles.emptyText}>No research saved yet</Text>
            <Text style={styles.emptySubtext}>
              Enter text and click "Save Current" to start building your research collection
            </Text>
          </View>
        ) : (
          research.map((entry) => {
            const isExpanded = expandedIds.has(entry.id);
            const topCiphers = getTopCiphers(entry);

            return (
              <View key={entry.id} style={styles.entryCard}>
                {/* Quick View - Always Visible */}
                <TouchableOpacity 
                  style={styles.entryHeader}
                  onPress={() => toggleExpand(entry.id)}
                >
                  <View style={styles.entryHeaderLeft}>
                    <Text style={styles.entryText} numberOfLines={1}>
                      "{entry.text}"
                    </Text>
                    <Text style={styles.entryDate}>{formatDate(entry.timestamp)}</Text>
                    {entry.note && (
                      <Text style={styles.entryNote} numberOfLines={1}>
                        💭 {entry.note}
                      </Text>
                    )}
                  </View>
                  <View style={styles.entryHeaderRight}>
                    <Text style={styles.expandIcon}>{isExpanded ? '▼' : '▶'}</Text>
                  </View>
                </TouchableOpacity>

                {/* Top 3 Ciphers - Quick View */}
                {topCiphers.length > 0 ? (
                  <View style={styles.quickResults}>
                    {topCiphers.map((cipher, idx) => (
                      <View key={idx} style={styles.quickResultItem}>
                        <Text style={styles.quickResultName}>{cipher.name}</Text>
                        <Text style={styles.quickResultValue}>{cipher.value}</Text>
                      </View>
                    ))}
                  </View>
                ) : (
                  <View style={styles.quickResults}>
                    <Text style={styles.emptySubtext}>No results calculated</Text>
                  </View>
                )}

                {/* Tags */}
                {entry.tags && entry.tags.length > 0 && (
                  <View style={styles.tags}>
                    {entry.tags.map((tag, idx) => (
                      <View key={idx} style={styles.tag}>
                        <Text style={styles.tagText}>#{tag}</Text>
                      </View>
                    ))}
                  </View>
                )}

                {/* Expanded View - Detailed Results */}
                {isExpanded && (
                  <View style={styles.expandedContent}>
                    <Text style={styles.expandedTitle}>All Results ({entry.results.length})</Text>
                    <ScrollView style={styles.detailedResults} nestedScrollEnabled>
                      {entry.results.map((result, idx) => (
                        <View key={idx} style={styles.detailedResultItem}>
                          <View style={styles.detailedResultHeader}>
                            <Text style={styles.detailedResultName}>{result.name}</Text>
                            <Text style={styles.detailedResultValue}>{result.totalValue}</Text>
                          </View>
                          {result.wordValues && result.wordValues.length > 0 && (
                            <View style={styles.wordBreakdownMini}>
                              {result.wordValues.map((word, widx) => (
                                <Text key={widx} style={styles.wordBreakdownText}>
                                  {word.word}: {word.value}
                                </Text>
                              ))}
                            </View>
                          )}
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
            💡 Go to Home and click "Save to Research List" to start building your collection
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: 'white',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  warningText: {
    fontSize: 11,
    color: '#e67e22',
    marginTop: 2,
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: 'white',
  },
  actionButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  deleteAllButton: {
    backgroundColor: '#e74c3c',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  list: {
    flex: 1,
    padding: 12,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    backgroundColor: 'white',
    borderRadius: 6,
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 6,
  },
  emptySubtext: {
    fontSize: 13,
    color: '#7f8c8d',
    textAlign: 'center',
    maxWidth: 350,
    lineHeight: 18,
  },
  entryCard: {
    backgroundColor: 'white',
    borderRadius: 4,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fafafa',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  entryHeaderLeft: {
    flex: 1,
  },
  entryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 3,
  },
  entryDate: {
    fontSize: 10,
    color: '#95a5a6',
  },
  entryNote: {
    fontSize: 12,
    color: '#7f8c8d',
    fontStyle: 'italic',
    marginTop: 3,
    paddingTop: 3,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  entryHeaderRight: {
    justifyContent: 'center',
    paddingLeft: 10,
  },
  expandIcon: {
    fontSize: 11,
    color: '#7f8c8d',
  },
  quickResults: {
    flexDirection: 'row',
    padding: 10,
    gap: 8,
    backgroundColor: 'white',
  },
  quickResultItem: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 8,
    borderRadius: 3,
    borderLeftWidth: 3,
    borderLeftColor: '#3498db',
  },
  quickResultName: {
    fontSize: 9,
    color: '#7f8c8d',
    marginBottom: 3,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  quickResultValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    paddingBottom: 10,
    gap: 5,
  },
  tag: {
    backgroundColor: '#e8f4f8',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  tagText: {
    fontSize: 10,
    color: '#3498db',
    fontWeight: '600',
  },
  expandedContent: {
    padding: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#fafafa',
  },
  expandedTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  detailedResults: {
    maxHeight: 250,
  },
  detailedResultItem: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 3,
    marginBottom: 6,
    borderLeftWidth: 2,
    borderLeftColor: '#3498db',
  },
  detailedResultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  detailedResultName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2c3e50',
  },
  detailedResultValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3498db',
  },
  wordBreakdownMini: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  wordBreakdownText: {
    fontSize: 10,
    color: '#7f8c8d',
  },
  entryActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  entryActionButton: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  deleteButton: {
    borderLeftWidth: 1,
    borderLeftColor: '#e0e0e0',
  },
  entryActionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2c3e50',
  },
  emptyHint: {
    padding: 12,
    margin: 12,
    backgroundColor: '#fff9e6',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ffe066',
  },
  emptyHintText: {
    color: '#856404',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
});
