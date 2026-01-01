import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { colors, typography, spacing, layout } from '../utils/theme';
import CipherItem from '../components/CipherItem';
import CategoryHeader from '../components/CategoryHeader';
import { getAvailableCiphers, getCipherCategories } from '../utils/calculator';
import { Ionicons } from '@expo/vector-icons';

const CiphersScreen = ({ selectedCiphers, setSelectedCiphers }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState({
    English: true,
    Reverse: true,
    Jewish: true,
    Kabbalah: true,
    Mathematical: true,
    Other: true
  });

  // Get ciphers and categories from web-compatible system
  const availableCiphers = getAvailableCiphers();
  const cipherCategories = getCipherCategories();

  useFocusEffect(
    useCallback(() => {
      setExpandedCategories({
        English: true,
        Reverse: true,
        Jewish: true,
        Kabbalah: true,
        Mathematical: true,
        Other: true
      });
    }, [])
  );

  const toggleCategory = (category) => {
    setExpandedCategories({
      ...expandedCategories,
      [category]: !expandedCategories[category]
    });
  };

  const toggleCipher = (cipherKey) => {
    const cipher = availableCiphers[cipherKey];
    const isCurrentlySelected = selectedCiphers[cipherKey] || selectedCiphers[cipher.name];

    setSelectedCiphers({
      ...selectedCiphers,
      [cipherKey]: !isCurrentlySelected,
      [cipher.name]: !isCurrentlySelected
    });
  };

  const selectAll = () => {
    const newSelections = {};
    Object.keys(availableCiphers).forEach(key => {
      newSelections[key] = true;
      // Also enable by cipher name for compatibility
      newSelections[availableCiphers[key].name] = true;
    });
    setSelectedCiphers(newSelections);
  };

  const clearAll = () => {
    const newSelections = {};
    Object.keys(availableCiphers).forEach(key => {
      newSelections[key] = false;
      // Also disable by cipher name for compatibility
      newSelections[availableCiphers[key].name] = false;
    });
    setSelectedCiphers(newSelections);
  };

  const renderCipherItem = (cipherKey) => {
    const cipher = availableCiphers[cipherKey];
    return (
      <CipherItem
        key={cipherKey}
        name={cipher.name}
        description={cipher.description}
        isSelected={selectedCiphers[cipherKey] || selectedCiphers[cipher.name]}
        onToggle={() => toggleCipher(cipherKey)}
      />
    );
  };

  const renderCategory = (category) => {
    const categoryKeys = cipherCategories[category];
    if (!categoryKeys || categoryKeys.length === 0) return null;

    if (searchTerm) {
      const filteredKeys = categoryKeys.filter(key =>
        availableCiphers[key] && availableCiphers[key].name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (filteredKeys.length === 0) return null;
    }

    return (
      <View key={category} style={styles.categoryContainer}>
        <CategoryHeader
          title={category}
          isExpanded={expandedCategories[category]}
          onToggle={() => toggleCategory(category)}
        />
        {expandedCategories[category] && (
          <View style={styles.ciphersList}>
            {categoryKeys.map(key => {
              if (!availableCiphers[key]) return null;
              if (searchTerm && !availableCiphers[key].name.toLowerCase().includes(searchTerm.toLowerCase())) {
                return null;
              }
              return renderCipherItem(key);
            })}
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.title}>Select Ciphers</Text>

          <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
              <Ionicons name="search" size={20} color={colors.lightText} style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search ciphers..."
                value={searchTerm}
                onChangeText={setSearchTerm}
                clearButtonMode="while-editing"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button} onPress={selectAll}>
              <Text style={styles.buttonText}>Select All</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={clearAll}>
              <Text style={styles.buttonText}>Clear All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            <View style={styles.ciphersContainer}>
              {Object.keys(cipherCategories).map(category => renderCategory(category))}
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const shadowStyle = Platform.select({
  ios: layout.shadow.small,
  android: {
    elevation: 3,
  },
});

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    padding: spacing.md,
  },
  title: {
    fontSize: typography.fontSize.xlarge,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.md,
  },
  searchContainer: {
    marginBottom: spacing.md,
  },
  searchInputContainer: {
    backgroundColor: colors.white,
    borderRadius: layout.borderRadius.medium,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    ...shadowStyle,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    padding: spacing.md,
    fontSize: typography.fontSize.medium,
    ...Platform.select({
      android: {
        paddingVertical: spacing.sm
      }
    })
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: layout.borderRadius.medium,
    padding: spacing.sm,
    flex: 1,
    marginRight: spacing.sm,
    alignItems: 'center',
    ...shadowStyle,
  },
  clearButton: {
    backgroundColor: colors.secondary,
    marginRight: 0,
    marginLeft: spacing.sm,
  },
  buttonText: {
    color: colors.white,
    fontSize: typography.fontSize.medium,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  categoryContainer: {
    backgroundColor: colors.white,
    borderRadius: layout.borderRadius.medium,
    marginBottom: spacing.md,
    overflow: 'hidden',
    ...shadowStyle,
  },
  ciphersList: {
    padding: spacing.sm,
  },
});

export default CiphersScreen;
