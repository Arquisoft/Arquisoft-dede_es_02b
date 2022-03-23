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
    loadDatabase(); 
});

afterAll(async () => {
    closeServer(server);
})

describe('pruductos ', () => {
    
});