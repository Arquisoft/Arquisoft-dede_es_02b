import path from 'path';

var dotenvPath = path.resolve('../.env');
require("dotenv").config({path: dotenvPath});

import request, {Response} from 'supertest';
import { Application } from 'express';
import * as http from 'http';
import {createApp, createServer, closeServer, loadDatabase} from './setServerForTests';
import apiProductos from '../productos/apiProductos';

let app:Application;
let server:http.Server;

beforeAll(async () => {
    app = createApp();
    app.use(apiProductos);

    server = createServer(app);  
    await loadDatabase(); 
});

afterAll(async () => {
    await closeServer(server);
})

describe('añadir producto ', () => {
    it('correctamente', async () => {
        await probarAddProductos({nombre:'uva', origen:'León', precio:3.2, descripcion:'Uva procendente de león.', foto:'https://i.ibb.co/HnSzg1b/reineta.jpg'}, 200);
    });
});

async function probarAddProductos(arg0: {nombre?: string, origen?:string, precio?:number, descripcion?:string, foto?:string}, code:number):Promise<Response>{
    const response:Response = await request(app).post('/products/add').send(arg0).set('Accept', 'application/json');
    expect(response.statusCode).toBe(code);
    return response;
}