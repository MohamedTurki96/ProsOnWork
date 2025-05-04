const { join } = require('path');

const { NxWebpackPlugin } = require('@nx/webpack');

module.exports = {
  output: {
    path: join(__dirname, '../../dist/apps/service-file'),
  },
  plugins: [
    new NxWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: [
        {
          input: join(__dirname, 'media'),
          glob: '**/*',
          output: 'media',
        },
      ],
      watch: true,
      optimization: false,
      outputHashing: 'none',
    }),
  ],
  stats: 'errors-only',
  watch: true,
};
