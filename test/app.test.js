import request from "supertest";
import app from "../src/app/app";


describe('Test the root path', () => {

    test('It should response the GET method', async () => {

        var response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
    });

});
