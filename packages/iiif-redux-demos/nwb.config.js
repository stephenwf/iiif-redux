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
    define: {
      'process.env.__VERSION__': JSON.stringify(
        require('./package.json').version
      ),
      'process.env.DEBUG': JSON.stringify('iiif-redux'),
      'process.env.HASH': JSON.stringify(
        require('child_process')
          .execSync('git rev-parse HEAD')
          .toString()
          .trim()
      ),
    },
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
