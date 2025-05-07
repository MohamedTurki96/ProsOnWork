const { join } = require('path');

const { NxWebpackPlugin } = require('@nx/webpack');

module.exports = {
  output: {
    path: join(__dirname, '../../dist/libs/core'),
  },
  plugins: [
    new NxWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/index.ts',
      tsConfig: './tsconfig.lib.json',
      optimization: false,
      outputHashing: 'none',
    }),
  ],
  stats: 'errors-only',
};
