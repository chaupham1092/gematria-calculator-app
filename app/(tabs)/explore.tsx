import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AboutScreen from '../../src/screens/AboutScreen';

export default function AboutTab() {
  return (
    <SafeAreaProvider>
      <AboutScreen />
    </SafeAreaProvider>
  );
}
