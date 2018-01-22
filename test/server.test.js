import request from "supertest";

import createApp from "../server/core/app";
import './utils';


describe('Server', () => {

    test('meta', () => {
        const app = createApp();
        expect(app).toBeTruthy();
    });


    test('404', async () => {
        const app = createApp();
        var response = await request(app).get('/');
        expect(response.statusCode).toBe(404);
    });

    test('no config', async () => {
        const app = createApp('bjhbjhb');
        expect(app).toBeTruthy();
    });
});
