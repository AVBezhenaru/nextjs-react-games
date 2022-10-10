const NextFederationPlugin = require('@module-federation/nextjs-mf/lib/NextFederationPlugin');
const { dependencies } = require('./package.json');

module.exports = {
  webpack(config, options) {
    if (!options.isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: 'host',
          remotes: {
            remote: process.env.DOMAIN,
          },
        }),
      );
    }

    return config;
  },
};
