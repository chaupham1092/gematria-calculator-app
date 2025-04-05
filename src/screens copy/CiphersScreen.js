import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { colors, typography, spacing, layout } from '../utils/theme';
import CipherItem from '../components/CipherItem';
import CategoryHeader from '../components/CategoryHeader';
import { ciphers, cipherCategories } from '../data/ciphers';
import { Ionicons } from '@expo/vector-icons';

const CiphersScreen = ({ selectedCiphers, setSelectedCiphers }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState({
    English: true,
    Reverse: true,
    Jewish: true
  });

  // Reset expanded categories when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      setExpandedCategories({
        English: true,
        Reverse: true,
        Jewish: true
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
    setSelectedCiphers({
      ...selectedCiphers,
      [cipherKey]: !selectedCiphers[cipherKey]
    });
  };

  const selectAll = () => {
    const newSelections = {};
    Object.keys(ciphers).forEach(key => {
      newSelections[key] = true;
    });
    setSelectedCiphers(newSelections);
  };

  const clearAll = () => {
    const newSelections = {};
    Object.keys(ciphers).forEach(key => {
      newSelections[key] = false;
    });
    setSelectedCiphers(newSelections);
  };

  const renderCipherItem = (cipherKey) => {
    const cipher = ciphers[cipherKey];
    return (
      <CipherItem
        key={cipherKey}
        name={cipher.name}
        description={cipher.description}
        isSelected={selectedCiphers[cipherKey]}
        onToggle={() => toggleCipher(cipherKey)}
      />
    );
  };

  const renderCategory = (category) => {
    const categoryKeys = cipherCategories[category];
    
    if (searchTerm) {
      const filteredKeys = categoryKeys.filter(key => 
        ciphers[key].name.toLowerCase().includes(searchTerm.toLowerCase())
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
              if (searchTerm && !ciphers[key].name.toLowerCase().includes(searchTerm.toLowerCase())) {
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
          {Object.keys(cipherCategories).map(category => renderCategory(category))}
        </ScrollView>
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
    ...layout.shadow.small,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    padding: spacing.md,
    fontSize: typography.fontSize.medium,
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
    ...layout.shadow.small,
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
    ...layout.shadow.small,
  },
  ciphersList: {
    padding: spacing.sm,
  },
});

export default CiphersScreen;
