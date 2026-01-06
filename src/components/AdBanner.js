import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import Constants from 'expo-constants';
import * as TrackingTransparency from 'expo-tracking-transparency';

const AdBanner = ({ 
  placement = 'default',
  size = BannerAdSize.ANCHORED_ADAPTIVE_BANNER,
  style = {},
  onAdLoaded = () => {},
  onAdFailedToLoad = () => {},
}) => {
  const [adLoaded, setAdLoaded] = useState(false);
  const [adError, setAdError] = useState(null);
  const [trackingStatus, setTrackingStatus] = useState(null);

  // Production Ad Unit ID from your AdMob account
  const BANNER_AD_UNIT_ID = 'ca-app-pub-5199693306490546/6903737467';
  
  // Test Ad Unit ID for development
  const TEST_BANNER_AD_UNIT_ID = 'ca-app-pub-3940256099942544/6300978111';
  
  // Use test ads in development OR TestFlight, production ads only in App Store
  const isTestFlight = Constants.appOwnership === 'expo' || __DEV__;
  const adUnitId = isTestFlight ? TEST_BANNER_AD_UNIT_ID : BANNER_AD_UNIT_ID;

  // Get tracking permission status
  useEffect(() => {
    const getTrackingStatus = async () => {
      if (Platform.OS === 'ios') {
        try {
          const { status } = await TrackingTransparency.getTrackingPermissionsAsync();
          setTrackingStatus(status);
        } catch (error) {
          console.error('Error getting tracking status:', error);
          setTrackingStatus('denied'); // Default to non-personalized ads
        }
      } else {
        setTrackingStatus('granted'); // Android doesn't require ATT
      }
    };

    getTrackingStatus();
  }, []);

  const handleAdLoaded = () => {
    setAdLoaded(true);
    setAdError(null);
    onAdLoaded();
    console.log(`Ad loaded successfully for placement: ${placement}`);
  };

  const handleAdFailedToLoad = (error) => {
    setAdLoaded(false);
    setAdError(error);
    onAdFailedToLoad(error);
    console.error(`Ad failed to load for placement: ${placement}`, error);
  };

  // Don't render on web platform or if tracking status not determined yet
  if (Platform.OS === 'web' || trackingStatus === null) {
    return null;
  }

  // Determine if we should request personalized ads
  const requestNonPersonalizedAdsOnly = trackingStatus !== 'granted';

  return (
    <View style={[styles.container, style]}>
      <BannerAd
        unitId={adUnitId}
        size={size}
        requestOptions={{
          requestNonPersonalizedAdsOnly: requestNonPersonalizedAdsOnly,
          keywords: ['gematria', 'numerology', 'calculator', 'spiritual', 'mysticism', 'numbers'],
        }}
        onAdLoaded={handleAdLoaded}
        onAdFailedToLoad={handleAdFailedToLoad}
        onAdOpened={() => console.log(`Ad opened for placement: ${placement}`)}
        onAdClosed={() => console.log(`Ad closed for placement: ${placement}`)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    minHeight: 50,
  },
});

export default AdBanner;