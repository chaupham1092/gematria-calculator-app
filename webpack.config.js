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

    // Customize the config before returning it
    return config;
};
