const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

module.exports = {
    distDir: 'build',
    webpack: (config) => {
        config.plugins.push(
            new SWPrecacheWebpackPlugin({
                logger(message) {
                    if (message.indexOf('Total precache size is') === 0) {
                        // This message occurs for every build and is a bit too noisy.
                        return;
                    }
                    console.log(message);
                },
                minify: false,
                cacheId: 'mobazoo',
                filename: 'sw.js',
                staticFileGlobsIgnorePatterns: [/build\//],
                runtimeCaching: [
                    {
                        handler: 'networkFirst',
                        urlPattern: /^https?.*/
                    }
                ]
            })
        );
        // config.performance.hints = 'warning';
        return config;
    }
};
