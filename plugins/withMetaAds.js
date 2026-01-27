const { withBuildProperties } = require("expo-build-properties");
const { withAppBuildGradle } = require("@expo/config-plugins");

/**
 * Custom Expo plugin to add Meta Audience Network mediation adapter
 * for AdMob mediation on both iOS and Android platforms.
 * 
 * This plugin adds the necessary native dependencies for Meta Audience Network
 * to work with AdMob mediation.
 */
const withMetaAds = (config) => {
  // Add iOS Pod for Meta Audience Network mediation
  // Reference: https://developers.google.com/admob/ios/mediation/meta
  config = withBuildProperties(config, {
    ios: {
      extraPods: [
        { 
          name: "GoogleMobileAdsMediationMeta",
          // Using latest stable version as of Jan 2025
          // Check https://developers.google.com/admob/ios/mediation/meta for updates
        },
      ],
    },
  });

  // Add Android Gradle dependencies for Meta Audience Network mediation
  // Reference: https://developers.google.com/admob/android/mediation/meta
  config = withAppBuildGradle(config, (config) => {
    if (config.modResults.contents) {
      // Add Meta Audience Network dependencies to the dependencies block
      const dependenciesToAdd = `
    // Meta Audience Network mediation for AdMob
    implementation 'com.facebook.android:audience-network-sdk:6.21.0'
    implementation 'com.google.ads.mediation:facebook:6.21.0.0'`;

      // Find the dependencies block and add our dependencies
      if (!config.modResults.contents.includes('audience-network-sdk')) {
        config.modResults.contents = config.modResults.contents.replace(
          /dependencies\s*{/,
          `dependencies {${dependenciesToAdd}`
        );
      }
    }
    return config;
  });

  return config;
};

module.exports = withMetaAds;
