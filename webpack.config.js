const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
    const config = await createExpoWebpackConfigAsync(
        {
            ...env,
            // Ensure we use the web entry point
            babel: {
                dangerouslyAddModulePathsToTranspile: ['src/web']
            }
        },
        argv
    );

    // Exclude mobile-only packages from web build
    config.resolve.alias = {
        ...config.resolve.alias,
        'react-native-google-mobile-ads': false,
        '@react-native-google-mobile-ads/admob': false,
    };

    // Customize the config before returning it
    return config;
};
