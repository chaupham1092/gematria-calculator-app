import React from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

// Use TestIds.BANNER for development to avoid account bans
// Replace these with your real Ad Unit IDs for production
const adUnitId = __DEV__
    ? TestIds.BANNER
    : Platform.select({
        ios: 'ca-app-pub-xxxxxxxxxxxxxxxx/xxxxxxxxxx', // REPLACE THIS
        android: 'ca-app-pub-xxxxxxxxxxxxxxxx/xxxxxxxxxx', // REPLACE THIS
    });

const AdBanner = () => {
    // Don't render ads on web
    if (Platform.OS === 'web') return null;

    return (
        <View style={styles.container}>
            <BannerAd
                unitId={adUnitId}
                size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: '#f2f2f7',
        paddingVertical: 1, // small padding
    },
});

export default AdBanner;
