import path from 'path';

var dotenvPath = path.resolve('../.env');
require("dotenv").config({path: dotenvPath});

import request, {Response} from 'supertest';
import express, { Application } from 'express';
import * as http from 'http';
import bp from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import apiUsuarios from '../usuarios/apiUsuarios';
import apiProductos from '../productos/apiProductos';
import apiPedidos from '../pedidos/apiPedidos';
import apiCarrito from '../carrito/apiCarrito';

let app:Application;
let server:http.Server;

beforeAll(async () => {
    app = express();
    
    const port: string = process.env.PORT!;
    const conexiondb: string = process.env.MONGO_URI!;

    const options: cors.CorsOptions = {
        origin: [process.env.CORS_OPTIONS!]
    };

    app.use(cors(options));
    app.use(bp.json());

    app.use(apiUsuarios);
    app.use(apiPedidos);
    app.use(apiProductos);
    app.use(apiCarrito);

    server = app.listen(port, ():void => {
        console.log('Restapi server for testing listening on '+ port);
    }).on("error",(error:Error)=>{
        console.error('Error occured: ' + error.message);
    });

    mongoose.connect(conexiondb) 
    .then(() => console.log("BD conectada"))
});

afterAll(async () => {
    server.close() //close the server
})

describe('user ', () => {
    /**
     * Test that we can list users without any error.
     */
    it('can be listed',async () => {
        const response:Response = await request(app).get("/users/list");
        expect(response.statusCode).toBe(200);
    });

    /**
     * Tests that a user can be created through the productService without throwing any errors.
     */
    it('can be created correctly', async () => {
        let nombre:string = 'Pablo'
        let email:string = 'gonzalezgpablo@uniovi.es'
        let dni:string = '12345678a'
        let contraseña:string = '1234'
        const response:Response = await request(app).post('/users/add').send({
            nombre: nombre,
            email: email,
            dni: dni,
            contraseña: contraseña
        }).set('Accept', 'application/json')
        expect(response.statusCode).toBe(200);
    });
});