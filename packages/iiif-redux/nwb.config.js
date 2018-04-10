module.exports = {
  type: 'web-module',
  npm: {
    esModules: true,
    umd: false,
  },
  babel: {
    env: {
      targets: {
        browsers: ['last 2 versions', 'ie 10', 'ie 11'],
      },
      modules: false,
    },
  },
  webpack: {
    config(config) {
      config.resolve.extensions.push('.ts', '.tsx');
      config.module.rules.push({
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
      });

      return config;
    },
  },
};
