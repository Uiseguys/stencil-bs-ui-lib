exports.config = {
	namespace: 'index',
	generateDistribution: true,
	bundles: [
		{components: ['stencil-bootstrap-demo', 'alerts-page', 'scb-alert']},
		{components: ['badge-page', 'scb-badge']},
		{components: ['breadcrumb-page', 'scb-breadcrumb']},
		{components: ['video-player-page', 'fcl-video-player']},
		{components: ['fcl-image-page', 'fcl-image']}
	],
	collections: [
		{name: '@stencil/router'}
	],
	serviceWorker: {
		globPatterns: [
			'**/*.{js,css,scss,json,html,ico,png,jpeg}'
		],
		globIgnores: [
			'build/app/svg/*.js'
		]
	},
	copy: [
		{src: 'assets/fonts', dest: 'font'},
		{src: 'assets/img', dest: 'css'}
	]
};

exports.devServer = {
  //root: 'www',
  //watchGlob: '**/**'// httpPort: '8080'
}
