const sass = require('@stencil/sass');
exports.config = {
	namespace: 'index',
	generateDistribution: true,
	bundles: [
		{components: ['stencil-bootstrap-demo', 'alerts-page', 'scb-alert']},
		{components: ['badge-page', 'scb-badge']},
		{components: ['breadcrumb-page', 'scb-breadcrumb']},
		{components: ['video-player-page', 'fcl-video-player']},
		{components: ['fcl-image-page', 'fcl-image']},
		{components: ['dialog-page', 'scb-dialog']}
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
		{src: 'components/fcl-video-player/css/fonts', dest: 'fonts'},
		{src: 'assets/img', dest: 'css'}
	],
	plugins: [
		sass()
	]
};

exports.devServer = {
  //root: 'www',
  //watchGlob: '**/**'// httpPort: '8080'
}
