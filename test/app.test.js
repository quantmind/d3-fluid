import request from "supertest";
import createApp from "../src/core/app";


describe('Test the root path', () => {

    var app = createApp();

    test('It should response the GET method', () => {
        expect(app).toBeTruthy();
    });


    test('It should response the GET method', async () => {

        var response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
    });

});
