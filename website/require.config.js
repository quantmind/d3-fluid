

module.exports = {
    out: 'static/site.js',
    prepend: [
        'd3-fluid/build/d3-fluid.js'
    ],
    append: [
        'build/.tmp/docs.js'
    ],
    dependencies: {
        'd3-view': {
            origin: '/',
            main: 'd3-view-components.js'
        },
        handlebars: {
            main: 'dist/handlebars.min.js'
        }
    }
};
