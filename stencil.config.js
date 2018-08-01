const sass = require('@stencil/sass');

exports.config = {
  namespace: 'ui-lib',
  // generateDistribution: true,
  // serviceWorker: true,
  outputTargets: [{ type: 'www' }, { type: 'dist' }],
  copy: [{ src: 'lib' }],
  plugins: [sass()]
};
