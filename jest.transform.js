module.exports = require('babel-jest').createTransformer({
  presets: [
    [
      'env',
      {
        targets: {
          node: '8.9',
        },
      },
    ],
    'react',
    'stage-1',
  ],
  babelrc: false,
});
