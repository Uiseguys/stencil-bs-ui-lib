import { Config } from "@stencil/core";
import { sass } from "@stencil/sass";

export const config: Config = {
  namespace: 'ui-lib',
  // generateDistribution: true,
  // serviceWorker: true,
  outputTargets: [
    { type: 'www' },
    { type: 'dist' },
    // {
    //   type: 'dist',
    //   dir: '../path-to-copy-distributive'
    // }
  ],
  copy: [{ src: 'lib' }],
  plugins: [sass()]
};
