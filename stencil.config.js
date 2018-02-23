const sass = require('@stencil/sass');

exports.config = {
    namespace: 'index',
    generateDistribution: true,
    serviceWorker: false,
    bundles: [
        {
            components: ['cwc-typeahead', 'cwc-tag', 'cwc-list']
        }
    ],
    plugins: [
        sass()
    ]
};

exports.devServer = {
    root: 'www',
    watchGlob: '**/**'
};
