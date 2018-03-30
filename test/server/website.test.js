//import request from "supertest";

import createApp from "../../server/core/app";

import '../utils';

const CWD = process.cwd();


describe('Website', () => {

    var app = createApp('siteConfig.js');

    test('meta', () => {
        expect(app).toBeTruthy();
        expect(app.config).toBeTruthy();
        expect(app.config.path).toBe(CWD);
    });

});
