//import request from "supertest";
import './utils';
import createApp from "../src/core/app";


describe('Website', () => {

    var app = createApp('website/siteConfig.js');

    test('meta', () => {
        expect(app).toBeTruthy();
    });

});
