import express from 'express';

import markdown from '../plugins/markdown';
import sitemap from '../plugins/sitemap';
import algolia from '../plugins/algolia';


export default function (config) {
    if (!config) config = {};

    const app = express();

    algolia(app, config);
    markdown(app, config);
    sitemap(app, config);

    app.get('/', (req, res) => {
        res.status(200).send('Hello World!');
    });


    return app;

}
