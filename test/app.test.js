import request from "supertest";
import createApp from "../src/core/app";


describe('Test app', () => {

    var app = createApp();

    test('meta', () => {
        expect(app).toBeTruthy();
    });


    test('404', async () => {

        var response = await request(app).get('/');
        expect(response.statusCode).toBe(404);
    });

});
