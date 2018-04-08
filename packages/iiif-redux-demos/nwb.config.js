module.exports = {
  type: 'react-app',
  babel: {
    env: {
      targets: {
        browsers: ['last 2 versions', 'IE >= 9'],
      },
    },
    plugins: [
      ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
    ],
  },
  webpack: {
    rules: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          '@primary-color': '#1DA57A',
        },
      },
    },
  },
};
