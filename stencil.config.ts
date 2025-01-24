import { Config } from '@stencil/core';
// https://stenciljs.com/docs/config

export const config: Config = {
  globalStyle: 'src/global/app.css',
  globalScript: 'src/global/app.ts',
  taskQueue: 'async',
  outputTargets: [
    {
      type: 'www',
      // comment the following line to disable service workers in production
      serviceWorker: null,
      baseUrl: 'https://myapp.local/',
    },
  ],
  env: {
    BEARER_TOKEN: process.env.BEARER_TOKEN,
  },
  devServer: {
    reloadStrategy: 'hmr', // Hot Module Reloading to see local changes without refreshing the page
  },
};
