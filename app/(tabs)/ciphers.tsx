import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CiphersScreen from '../../src/screens/CiphersScreen';
import { getInitialCipherSelections } from '../../src/utils/calculator';

const CIPHER_SELECTIONS_STORAGE_KEY = 'gematria_calculator_cipher_selections';

const getDefaultCipherSelections = () => {
  const allCiphers = getInitialCipherSelections();
  const defaultCiphers = [
    'English Ordinal',
    'Full Reduction',
    'Reverse Ordinal',
    'Reverse Full Reduction'
  ];
  
  const selections: Record<string, boolean> = {};
  Object.keys(allCiphers).forEach(key => {
    selections[key] = defaultCiphers.includes(key);
  });
  
  return selections;
};

export default function CiphersTab() {
  const [selectedCiphers, setSelectedCiphers] = useState(getDefaultCipherSelections());

  useEffect(() => {
    const loadSavedSelections = async () => {
      try {
        const savedSelectionsJson = await AsyncStorage.getItem(CIPHER_SELECTIONS_STORAGE_KEY);
        if (savedSelectionsJson) {
          const savedSelections = JSON.parse(savedSelectionsJson);
          setSelectedCiphers(savedSelections);
        }
      } catch (error) {
        console.error('Error loading saved cipher selections:', error);
      }
    };

    loadSavedSelections();
  }, []);

  const updateSelectedCiphers = async (newSelections: Record<string, boolean>) => {
    setSelectedCiphers(newSelections);
    try {
      await AsyncStorage.setItem(CIPHER_SELECTIONS_STORAGE_KEY, JSON.stringify(newSelections));
    } catch (error) {
      console.error('Error saving cipher selections:', error);
    }
  };

  return (
    <SafeAreaProvider>
      <CiphersScreen 
        selectedCiphers={selectedCiphers}
        setSelectedCiphers={updateSelectedCiphers}
      />
    </SafeAreaProvider>
  );
}
