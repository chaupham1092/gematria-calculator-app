const { withBuildProperties } = require("expo-build-properties");
const { withAppBuildGradle } = require("@expo/config-plugins");

/**
 * Custom Expo plugin to add AppLovin mediation adapter
 * for AdMob mediation on both iOS and Android platforms.
 * 
 * This plugin adds the necessary native dependencies for AppLovin
 * to work with AdMob mediation.
 */
const withAppLovinAds = (config) => {
  // Add iOS Pod for AppLovin mediation
  // Reference: https://developers.google.com/admob/ios/mediation/applovin
  config = withBuildProperties(config, {
    ios: {
      extraPods: [
        { 
          name: "GoogleMobileAdsMediationAppLovin",
          // Using latest stable version as of Jan 2025
          // Check https://developers.google.com/admob/ios/mediation/applovin for updates
        },
      ],
    },
  });

  // Add Android Gradle dependencies for AppLovin mediation
  // Reference: https://developers.google.com/admob/android/mediation/applovin
  config = withAppBuildGradle(config, (config) => {
    if (config.modResults.contents) {
      // Add AppLovin dependencies to the dependencies block
      const dependenciesToAdd = `
    // AppLovin mediation for AdMob
    implementation 'com.applovin:applovin-sdk:13.5.1'
    implementation 'com.google.ads.mediation:applovin:13.5.1.0'`;

      // Find the dependencies block and add our dependencies
      if (!config.modResults.contents.includes('applovin-sdk')) {
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

module.exports = withAppLovinAds;
