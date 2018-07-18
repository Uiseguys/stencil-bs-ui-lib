const sass = require('@stencil/sass');

exports.config = {
  namespace: 'index',
  // generateDistribution: true,
  // serviceWorker: true,
  outputTargets: [{ type: 'www' }, { type: 'dist' }],
  copy: [{ src: 'lib' }],
  plugins: [sass()]
};
