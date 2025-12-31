import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CalculatorScreen from '../screens/CalculatorScreen';
import CiphersScreen from '../screens/CiphersScreen';
import ResearchScreen from '../screens/ResearchScreen';
import AboutScreen from '../screens/AboutScreen';
import TabBar from '../components/TabBar';
import { getInitialCipherSelections } from '../utils/calculator';

const Tab = createBottomTabNavigator();

const CIPHER_SELECTIONS_STORAGE_KEY = 'gematria_calculator_cipher_selections';

// Default cipher selections - only 4 ciphers
const getDefaultCipherSelections = () => {
  const allCiphers = getInitialCipherSelections();
  const defaultCiphers = [
    'English Ordinal',
    'Full Reduction',
    'Reverse Ordinal',
    'Reverse Full Reduction'
  ];
  
  const selections = {};
  Object.keys(allCiphers).forEach(key => {
    selections[key] = defaultCiphers.includes(key);
  });
  
  return selections;
};

const AppNavigator = () => {
  const [selectedCiphers, setSelectedCiphers] = useState(getDefaultCipherSelections());
  const [isLoading, setIsLoading] = useState(true);

  // Load saved cipher selections from AsyncStorage
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
      } finally {
        setIsLoading(false);
      }
    };

    loadSavedSelections();
  }, []);

  // Save cipher selections to AsyncStorage when they change
  useEffect(() => {
    const saveCipherSelections = async () => {
      try {
        await AsyncStorage.setItem(CIPHER_SELECTIONS_STORAGE_KEY, JSON.stringify(selectedCiphers));
      } catch (error) {
        console.error('Error saving cipher selections:', error);
      }
    };

    if (!isLoading) {
      saveCipherSelections();
    }
  }, [selectedCiphers, isLoading]);

  // Custom function to update selected ciphers
  const updateSelectedCiphers = (newSelections) => {
    setSelectedCiphers(newSelections);
  };

  if (isLoading) {
    return null; // Or a loading spinner
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={props => <TabBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen name="Calculator">
          {props => <CalculatorScreen {...props} selectedCiphers={selectedCiphers} />}
        </Tab.Screen>
        <Tab.Screen name="Research">
          {props => (
            <ResearchScreen
              {...props}
              selectedCiphers={selectedCiphers}
              setSelectedCiphers={updateSelectedCiphers}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Ciphers">
          {props => (
            <CiphersScreen
              {...props}
              selectedCiphers={selectedCiphers}
              setSelectedCiphers={updateSelectedCiphers}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="About" component={AboutScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
