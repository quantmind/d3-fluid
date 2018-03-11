

module.exports = {
    out: "build/site.js",
    append: [
        "app/site.js"
    ],
    "dependencies": {
        "handlebars": {
            main: "dist/handlebars.min.js"
        }
    }
};
