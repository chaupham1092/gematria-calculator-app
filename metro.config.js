const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Platform-specific entry points
config.resolver.platforms = ['native', 'ios', 'android', 'web'];

// Use different entry points for web vs mobile
config.resolver.resolverMainFields = ['react-native', 'browser', 'main'];

module.exports = config;