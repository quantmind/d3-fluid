
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
    static: [
        ['/static', 'build']
    ],
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
                    template: "sidenav",
                    sidenav: {
                        routes: {
                            "/components/:name": {
                                component: "<markdown source='/components/{{ name }}.md'></markdown>"
                            }
                        }
                    }
                }
            },
            {
                meta: {
                    slug: "",
                    path: "./site",
                    template: "topnav",
                    topnav: {
                        brand: "d3-fluid",
                        navigationRight: [
                            {
                                "name": "components",
                                "href": "/components"
                            },
                            {
                                "name": "docs",
                                "href": "/docs"
                            }
                        ]
                    }
                }
            }
        ]
    }
};
