exports.config = {
  bundles: [
    { components: ['stencil-bootstrap-demo', 'alerts-page', 'scb-alert'] },
    { components: ['badge-page', 'scb-badge'] },
    { components: ['breadcrumb-page', 'scb-breadcrumb'] },
    { components: ['video-player-page', 'fcl-video-player']},
    { components: ['fcl-image-page', 'fcl-image']},
    { components: ['form-page', 'my-dynamic-form']}
  ],
  collections: [
    { name: '@stencil/router' }
  ]
};

exports.devServer = {
  // root: 'www',
  // watchGlob: '**/**'
  // httpPort: '8080'
}
