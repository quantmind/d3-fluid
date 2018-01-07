

module.exports = {
    out: "static/site.js",
    append: [
        "src/index.js"
    ],
    "dependencies": {
        "d3-fluid": {
            origin: "/static/d3-fluid.js"
        },
        "remarkable": {
            main: "dist/remarkable.min.js"
        }
    }
};
