import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors, typography, spacing, layout } from '../utils/theme';

const ResultItem = ({ result, expanded, onToggleExpand }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.header} 
        onPress={onToggleExpand}
        activeOpacity={0.7}
      >
        <Text style={styles.name}>{result.name}</Text>
        <View style={styles.valueContainer}>
          <Text style={styles.value}>{result.totalValue}</Text>
          <Text style={styles.arrow}>{expanded ? '▲' : '▼'}</Text>
        </View>
      </TouchableOpacity>
      
      {expanded && (
        <View style={styles.details}>
          {result.description && (
            <Text style={styles.description}>{result.description}</Text>
          )}
          
          <Text style={styles.breakdownTitle}>Word Breakdown:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.wordList}>
              {result.wordValues.map((wordObj, index) => (
                <View key={index} style={styles.wordItem}>
                  <View style={styles.wordHeader}>
                    <Text style={styles.wordText}>{wordObj.word}</Text>
                    <Text style={styles.wordValue}>{wordObj.value}</Text>
                  </View>
                  <Text style={styles.letterBreakdown}>
                    {result.letterBreakdowns[index]}
                  </Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: layout.borderRadius.medium,
    marginBottom: spacing.md,
    ...layout.shadow.small,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: expanded => expanded ? 1 : 0,
    borderBottomColor: colors.lightBorder,
  },
  name: {
    fontSize: typography.fontSize.medium,
    fontWeight: 'bold',
    color: colors.text,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    fontSize: typography.fontSize.medium,
    fontWeight: 'bold',
    color: colors.primary,
    marginRight: spacing.xs,
  },
  arrow: {
    fontSize: typography.fontSize.small,
    color: colors.lightText,
  },
  details: {
    padding: spacing.md,
  },
  description: {
    fontSize: typography.fontSize.small,
    color: colors.lightText,
    marginBottom: spacing.md,
  },
  breakdownTitle: {
    fontSize: typography.fontSize.small,
    fontWeight: 'bold',
    marginBottom: spacing.sm,
    color: colors.text,
  },
  wordList: {
    flexDirection: 'row',
    paddingBottom: spacing.sm,
    gap: spacing.sm,
  },
  wordItem: {
    backgroundColor: colors.highlight,
    padding: spacing.sm,
    borderRadius: layout.borderRadius.small,
    minWidth: 120,
    ...layout.shadow.small,
  },
  wordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
    paddingBottom: spacing.xs,
  },
  wordText: {
    fontWeight: '500',
    fontSize: typography.fontSize.small,
  },
  wordValue: {
    fontWeight: 'bold',
    color: colors.primary,
    fontSize: typography.fontSize.small,
  },
  letterBreakdown: {
    fontFamily: 'monospace',
    fontSize: typography.fontSize.small,
    color: colors.lightText,
  },
});

export default ResultItem;
