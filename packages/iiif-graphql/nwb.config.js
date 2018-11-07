module.exports = {
  type: 'react-app',
  babel: {
    plugins: ['graphql-tag', require.resolve('babel-plugin-import-graphql')],
  },
};
