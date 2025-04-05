import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, typography, spacing, layout } from '../utils/theme';

const CategoryHeader = ({ title, isExpanded, onToggle }) => {
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onToggle}
      activeOpacity={0.7}
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.arrow}>{isExpanded ? '▲' : '▼'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightBorder,
  },
  title: {
    fontSize: typography.fontSize.medium,
    fontWeight: 'bold',
    color: colors.text,
  },
  arrow: {
    fontSize: typography.fontSize.small,
    color: colors.lightText,
  },
});

export default CategoryHeader;
