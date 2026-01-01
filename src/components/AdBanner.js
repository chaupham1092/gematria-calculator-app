import React from 'react';
import { Platform, View, StyleSheet } from 'react-native';
// import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = 'test'; // Placeholder

const AdBanner = () => {
    // TEMPORARILY DISABLED FOR EXPO GO TESTING
    return null;

    /*
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
    */
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
