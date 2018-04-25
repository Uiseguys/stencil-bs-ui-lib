const sass = require('@stencil/sass');

exports.config = {
    namespace: 'index',
    // generateDistribution: true,
    // serviceWorker: true,
    outputTargets: [
        { type: 'www' },
        { type: 'dist' }
    ],
    bundles: [{
        components: ['cwc-typeahead', 'cwc-tag', 'cwc-list', 'cwc-infinite-list-watcher']
    }],
    plugins: [
        sass()
    ]
};

exports.devServer = {
    root: 'www',
    watchGlob: '**/**'
};