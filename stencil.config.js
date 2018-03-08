const sass = require('@stencil/sass');

exports.config = {
    namespace: 'index',
    generateDistribution: true,
    serviceWorker: true,
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
