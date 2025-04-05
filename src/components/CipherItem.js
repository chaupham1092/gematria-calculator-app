import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, layout } from '../utils/theme';

const CipherItem = ({ name, description, isSelected, onToggle }) => {
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onToggle}
      activeOpacity={0.7}
    >
      <View style={styles.checkbox}>
        {isSelected ? (
          <Ionicons name="checkbox" size={24} color={colors.primary} />
        ) : (
          <Ionicons name="square-outline" size={24} color={colors.lightText} />
        )}
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        {description && (
          <Text style={styles.description} numberOfLines={1}>
            {description}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm,
    borderRadius: layout.borderRadius.small,
    backgroundColor: colors.white,
  },
  checkbox: {
    marginRight: spacing.sm,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: typography.fontSize.medium,
    color: colors.text,
    fontWeight: '500',
  },
  description: {
    fontSize: typography.fontSize.small,
    color: colors.lightText,
    marginTop: spacing.xs / 2,
  },
});

export default CipherItem;
