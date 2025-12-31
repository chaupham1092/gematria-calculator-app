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
  Keyboard
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { colors, typography, spacing, layout } from '../utils/theme';
import ResultItem from '../components/ResultItem';
import { calculateGematria } from '../utils/calculator';

const CalculatorScreen = ({ selectedCiphers }) => {
  const [inputText, setInputText] = useState('');
  const [results, setResults] = useState([]);
  const [expandedResults, setExpandedResults] = useState({});

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

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.safeArea}>
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

            {results.length > 0 ? (
              <View style={styles.resultsContainer}>
                <Text style={styles.resultsTitle}>Results</Text>

                <ScrollView
                  style={styles.resultsList}
                  keyboardShouldPersistTaps="handled"
                >
                  {results.map((result) => (
                    <ResultItem
                      key={result.key}
                      result={result}
                      expanded={expandedResults[result.key]}
                      onToggleExpand={() => toggleResultExpand(result.key)}
                    />
                  ))}
                </ScrollView>
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
  },
  emptyText: {
    fontSize: typography.fontSize.medium,
    color: colors.lightText,
    fontStyle: 'italic',
  },
});

export default CalculatorScreen;
