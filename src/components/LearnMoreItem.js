import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, layout } from '../utils/theme';

const LearnMoreItem = ({ title, url, onPress }) => {
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (url) {
      Linking.openURL(url);
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Ionicons name="open-outline" size={20} color={colors.primary} style={styles.icon} />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  icon: {
    marginRight: spacing.sm,
  },
  title: {
    fontSize: typography.fontSize.medium,
    color: colors.primary,
  },
});

export default LearnMoreItem;
