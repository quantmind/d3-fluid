
module.exports = {
    baseUrl: "https://fluid.giottojs.org",
    title: "D3 Fluid - Micro web framework with d3-view and express",
    algolia: {
        apiKey: process.env.ALGOLIA_API_KEY
    },
    google: {
        analyticsId: 'UA-110136266-3'
    },
    github: "quantmind/d3-fluid",
    markdown: {
        paths: [
            {
                meta: {
                    slug: "docs",
                    path: "./server/docs",
                    template: "sidenav"
                }
            },
            {
                meta: {
                    slug: "components",
                    path: "./components",
                    template: "sidenav"
                }
            },
            {
                meta: {
                    slug: "",
                    path: "./site",
                    template: "topnav",
                    topnavBrand: "d3-fluid",
                    rightNav: [
                        {
                            "name": "docs",
                            "href": "/docs"
                        }
                    ]
                }
            }
        ]
    }
};
