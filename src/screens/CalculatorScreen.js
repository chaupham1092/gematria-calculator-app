import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { colors, typography, spacing, layout } from '../utils/theme';
import ResultItem from '../components/ResultItem';
import { calculateGematria } from '../utils/calculator';
import { saveToResearch } from '../utils/researchStorage';

const CalculatorScreen = ({ selectedCiphers, route }) => {
  const [inputText, setInputText] = useState('');
  const [results, setResults] = useState([]);
  const [expandedResults, setExpandedResults] = useState({});
  const [targetNumber, setTargetNumber] = useState('');

  // Handle loaded text from Research screen or deep links
  useEffect(() => {
    if (route?.params?.loadedText) {
      setInputText(route.params.loadedText);
    } else if (route?.params?.calc) {
      const { decodeCalculation } = require('../utils/shareUtils');
      const decoded = decodeCalculation(route.params.calc);
      if (decoded && decoded.text) {
        setInputText(decoded.text);
      }
    }
  }, [route?.params?.loadedText, route?.params?.calc]);

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const calculateResults = useCallback(
    debounce((text, ciphers) => {
      if (text.trim()) {
        const calculatedResults = calculateGematria(text, ciphers);
        setResults(calculatedResults);
        const newExpandedState = {};
        calculatedResults.forEach((result, index) => {
          newExpandedState[result.key] = index === 0;
        });
        setExpandedResults(newExpandedState);
      } else {
        setResults([]);
        setExpandedResults({});
      }
    }, 300),
    []
  );

  useEffect(() => {
    calculateResults(inputText, selectedCiphers);
  }, [inputText, selectedCiphers, calculateResults]);

  useEffect(() => {
    calculateResults(inputText, selectedCiphers);
  }, [inputText, selectedCiphers, calculateResults]);

  useFocusEffect(
    useCallback(() => {
      if (results.length > 0) {
        const newExpandedState = {};
        results.forEach((result, index) => {
          newExpandedState[result.key] = index === 0;
        });
        setExpandedResults(newExpandedState);
      }
    }, [results])
  );

  const toggleResultExpand = (key) => {
    setExpandedResults((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSaveToResearch = async () => {
    if (!inputText.trim()) {
      Alert.alert('No Text', 'Please enter some text to save');
      return;
    }

    if (results.length === 0) {
      Alert.alert('No Results', 'Please wait for calculations to complete');
      return;
    }

    try {
      await saveToResearch(inputText, selectedCiphers, results, '', []);
      Alert.alert('Saved!', 'Added to Research List');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  // Filter results by target number
  const filteredResults = targetNumber.trim()
    ? results.filter(result => result.totalValue.toString() === targetNumber.trim())
    : results;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.safeArea}>
          <ScrollView
            style={styles.mainScrollView}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            alwaysBounceVertical={true}
          >
            <View style={styles.container}>
              <Text style={styles.title}>Gematria Calculator</Text>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter text to calculate..."
                  value={inputText}
                  onChangeText={setInputText}
                  multiline
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              {/* Save to Research Button */}
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSaveToResearch}
              >
                <Text style={styles.saveButtonText}>💾 Save to Research List</Text>
              </TouchableOpacity>

              {/* Number Filter */}
              <View style={styles.filterContainer}>
                <Text style={styles.filterLabel}>Filter by Number (optional):</Text>
                <TextInput
                  style={styles.filterInput}
                  placeholder="e.g., 33"
                  value={targetNumber}
                  onChangeText={setTargetNumber}
                  keyboardType="numeric"
                />
              </View>

              {filteredResults.length > 0 ? (
                <View style={styles.resultsContainer}>
                  <Text style={styles.resultsTitle}>Results</Text>

                  <View style={styles.resultsList}>
                    {filteredResults.map((result) => (
                      <ResultItem
                        key={result.key}
                        result={result}
                        expanded={expandedResults[result.key]}
                        onToggleExpand={() => toggleResultExpand(result.key)}
                      />
                    ))}
                  </View>
                </View>
              ) : results.length > 0 && targetNumber.trim() ? (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyIcon}>🔍</Text>
                  <Text style={styles.emptyText}>
                    No ciphers match the number {targetNumber}
                  </Text>
                  <Text style={styles.emptySubtext}>
                    Try a different number or clear the filter
                  </Text>
                </View>
              ) : (
                <View style={styles.emptyContainer}>
                  {inputText.trim() ? (
                    <Text style={styles.emptyText}>
                      No ciphers selected. Please select at least one cipher.
                    </Text>
                  ) : (
                    <Text style={styles.emptyText}>Enter text to see results</Text>
                  )}
                </View>
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  mainScrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
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
  inputContainer: {
    backgroundColor: colors.white,
    borderRadius: layout.borderRadius.medium,
    marginBottom: spacing.md,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      }
    }),
  },
  input: {
    padding: spacing.md,
    fontSize: typography.fontSize.medium,
    minHeight: 100,
    textAlignVertical: 'top',
    ...Platform.select({
      android: {
        paddingTop: spacing.md,
        paddingBottom: spacing.md
      }
    })
  },
  resultsContainer: {
    flex: 1,
  },
  resultsTitle: {
    fontSize: typography.fontSize.large,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.md,
  },
  resultsList: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  emptyText: {
    fontSize: typography.fontSize.medium,
    color: colors.lightText,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  emptySubtext: {
    fontSize: typography.fontSize.small,
    color: colors.lightText,
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: layout.borderRadius.medium,
    alignItems: 'center',
    marginBottom: spacing.md,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      }
    }),
  },
  saveButtonText: {
    color: colors.white,
    fontSize: typography.fontSize.medium,
    fontWeight: '600',
  },
  filterContainer: {
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: layout.borderRadius.medium,
    marginBottom: spacing.md,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      }
    }),
  },
  filterLabel: {
    fontSize: typography.fontSize.small,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  filterInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: layout.borderRadius.small,
    padding: spacing.sm,
    fontSize: typography.fontSize.medium,
  },
});

export default CalculatorScreen;
