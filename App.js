import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
// import mobileAds from 'react-native-google-mobile-ads';

export default function App() {
  useEffect(() => {
    // Initialize AdMob (Commented out for Expo Go testing)
    /*
    mobileAds()
      .initialize()
      .then(adapterStatuses => {
        // Initialization complete!
        console.log('Mobile Ads initialized');
      });
    */
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <AppNavigator />
    </SafeAreaProvider>
  );
}
