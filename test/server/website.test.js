import request from "supertest";

import createApp from "../../server/core/app";

import '../utils';

const CWD = process.cwd();


describe('Website', () => {

    var app = createApp({config: 'siteConfig.js'});

    test('meta', () => {
        expect(app).toBeTruthy();
        expect(app.config).toBeTruthy();
        expect(app.config.path).toBe(CWD);
    });

    test('sitemap', async () => {
        var response = await request(app).get('/sitemap.xml');
        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toBe("application/xml; charset=utf-8");
    });

});
