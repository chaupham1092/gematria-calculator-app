import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Platform } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import mobileAds from 'react-native-google-mobile-ads';
import * as TrackingTransparency from 'expo-tracking-transparency';

export default function App() {
  useEffect(() => {
    const initializeApp = async () => {
      // Request tracking permission on iOS
      if (Platform.OS === 'ios') {
        try {
          const { status } = await TrackingTransparency.requestTrackingPermissionsAsync();
          console.log('ATT Status:', status);
          
          if (status === 'granted') {
            console.log('User granted tracking permission');
          } else {
            console.log('User denied tracking permission - will show non-personalized ads');
          }
        } catch (error) {
          console.error('Error requesting tracking permission:', error);
        }
      }

      // Initialize AdMob after ATT permission
      try {
        await mobileAds().initialize();
        console.log('Mobile Ads initialized');
        
        // Get adapter statuses
        const adapterStatuses = await mobileAds().initialize();
        console.log('Adapter statuses:', adapterStatuses);
      } catch (error) {
        console.error('AdMob initialization failed:', error);
      }
    };

    initializeApp();
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <AppNavigator />
    </SafeAreaProvider>
  );
}
