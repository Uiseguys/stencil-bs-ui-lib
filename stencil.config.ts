import { Config } from "@stencil/core";
import { sass } from "@stencil/sass";

export const config: Config = {
  namespace: 'ui-lib',
  // generateDistribution: true,
  // serviceWorker: true,
  outputTargets: [{ type: 'www' }, { type: 'dist' }],
  copy: [{ src: 'lib' }],
  plugins: [sass()]
};
