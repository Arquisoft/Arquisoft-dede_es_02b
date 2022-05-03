import request, { Response } from 'supertest';
import { Application } from 'express';
import * as http from 'http';
import { createApp, createServer, closeServer, loadDatabase } from './setServerForTests';
import apiSolid from '../solid/apiSolid';

let app: Application;
let server: http.Server;

beforeAll(async () => {
    app = createApp();
    app.use(apiSolid);

    server = createServer(app);
    await loadDatabase();
    jest.setTimeout(10000);
});

afterAll(async () => {
    await closeServer(server);
})

describe("sacar direccion ", () =>{
    it('webid correcto', async () => {
        const response: Response = await request(app).get('/solidUser/webId=adrifa13.solidcommunity.net').set('Accept', 'application/json'); 
        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual(["Camín De Güerces 1293 15A;Gijón;Asturias;España;33391"]);
    })

    it('webid incorrecto', async () => {
        const response: Response = await request(app).get('/solidUser/webId=papapa.solidcommunity.net').set('Accept', 'application/json'); 
        expect(response.statusCode).toBe(500);
    })
})