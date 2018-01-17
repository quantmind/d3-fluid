
module.exports = {
    baseUrl: "https://fluid.giottojs.org",
    title: "D3 Fluid - Micro web framework with d3-view and express",
    algolia: {
        apiKey: process.env.ALGOLIA_API_KEY
    },
    github: "quantmind/d3-fluid",
    markdown: {
        "paths": [
            {
                slug: "docs",
                path: "docs/",
                template: "sidenav",

            },
            {
                slug: "",
                path: "/",
                template: "topnav",
                topnavBrand: "d3-fluid",
                rightNav: [
                    {
                        "name": "docs",
                        "href": "/docs"
                    }
                ]
            }
        ],
        plugins: {

        }
    }
};
