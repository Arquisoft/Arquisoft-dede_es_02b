import path from 'path';

var dotenvPath = path.resolve('../.env');
require("dotenv").config({path: dotenvPath});

import request, {Response} from 'supertest';
import { Application } from 'express';
import * as http from 'http';
import {createApp, createServer, closeServer, loadDatabase} from './setServerForTests';
import apiCarrito from '../carrito/apiCarrito';

let app:Application;
let server:http.Server;

beforeAll(async () => {
    app = createApp();
    app.use(apiCarrito);

    server = createServer(app);  
    loadDatabase(); 
});

afterAll(async () => {
    closeServer(server);
})

describe('carrito ', () => {
  
});