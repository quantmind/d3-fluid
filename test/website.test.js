//import request from "supertest";
import createApp from "../server/core/app";

import './utils';


describe('Website', () => {

    var app = createApp('website/siteConfig.js');

    test('meta', () => {
        expect(app).toBeTruthy();
        expect(app.config).toBeTruthy();
    });

});
