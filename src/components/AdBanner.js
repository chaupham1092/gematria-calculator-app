import React from 'react';
import { Platform, View, StyleSheet } from 'react-native';
// import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

// Use production ID here for real ads, or TestIds.BANNER for testing
// const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-5199693306490546/6903737467';

const AdBanner = () => {
    // AdMob is temporarily commented out for Expo Go testing
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
