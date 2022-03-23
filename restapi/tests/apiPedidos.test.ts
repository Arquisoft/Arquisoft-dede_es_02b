

import request, {Response} from 'supertest';
import { Application } from 'express';
import * as http from 'http';
import {createApp, createServer, closeServer, loadDatabase} from './setServerForTests';
import apiPedidos from '../pedidos/apiPedidos';

let app:Application;
let server:http.Server;

beforeAll(async () => {
    app = createApp();
    app.use(apiPedidos);

    server = createServer(app);  
    loadDatabase(); 
});

afterAll(async () => {
    closeServer(server);
})

describe('pedidos ', () => {
   
});