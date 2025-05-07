const { join } = require('path');

const { NxWebpackPlugin } = require('@nx/webpack');

module.exports = {
  output: {
    path: join(__dirname, '../../dist/apps/service-user'),
  },
  plugins: [
    new NxWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      optimization: false,
      outputHashing: 'none',
    }),
  ],
  stats: 'errors-only'
};
