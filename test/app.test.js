import request from "supertest";
import createApp from "../src/core/app";
import {templates} from "../src/templates/index";
import './utils';


describe('Test app', () => {

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

    test('templates', () => {
        expect(Object.keys(templates).length).toBe(3);
    });
});
