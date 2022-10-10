const NextFederationPlugin = require('@module-federation/nextjs-mf/lib/NextFederationPlugin');
const { dependencies } = require('./package.json');

module.exports = {
  webpack(config, options) {
    if (!options.isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: 'host',
          remotes: {
            remote: `remote@${process.env.DOMAIN}/remote.js`,
          },
        }),
      );
    }

    return config;
  },
};
