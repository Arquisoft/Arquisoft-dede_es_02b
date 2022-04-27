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
    it('sin nombre', async () => {
        await probarAddProductos({origen:'León', precio:3.2, descripcion:'Uva procendente de león.', foto:'https://i.ibb.co/HnSzg1b/reineta.jpg'}, 500);
    });

    it('nombre = ""', async () => {
        await probarAddProductos({nombre:'', origen:'León', precio:3.2, descripcion:'Uva procendente de león.', foto:'https://i.ibb.co/HnSzg1b/reineta.jpg'}, 500);
    });

    it('sin origen', async () => {
        await probarAddProductos({nombre:'uva', precio:3.2, descripcion:'Uva procendente de león.', foto:'https://i.ibb.co/HnSzg1b/reineta.jpg'}, 500);
    });

    it('origen = ""', async () => {
        await probarAddProductos({nombre:'uva', origen:'', precio:3.2, descripcion:'Uva procendente de león.', foto:'https://i.ibb.co/HnSzg1b/reineta.jpg'}, 500);
    });

    it('sin precio', async () => {
        await probarAddProductos({nombre:'uva', origen:'León', descripcion:'Uva procendente de león.', foto:'https://i.ibb.co/HnSzg1b/reineta.jpg'}, 500);
    });

    it('precio < 0', async () => {
        await probarAddProductos({nombre:'uva', origen:'León', precio:-3.2, descripcion:'Uva procendente de león.', foto:'https://i.ibb.co/HnSzg1b/reineta.jpg'}, 500);
    });

    it('sin descripcion', async () => {
        await probarAddProductos({nombre:'uva', origen:'León', precio:3.2, foto:'https://i.ibb.co/HnSzg1b/reineta.jpg'}, 500);
    });

    it('descripcion = ""', async () => {
        await probarAddProductos({nombre:'uva', origen:'León', precio:3.2, descripcion:'', foto:'https://i.ibb.co/HnSzg1b/reineta.jpg'}, 500);
    });

    it('sin foto', async () => {
        await probarAddProductos({nombre:'uva', origen:'León', precio:3.2, descripcion:'Uva procendente de león.'}, 500);
    });

    it('foto = ""', async () => {
        await probarAddProductos({nombre:'uva', origen:'León', precio:3.2, descripcion:'Uva procendente de león.', foto:''}, 500);
    });

    it('correctamente', async () => {
        await probarAddProductos({nombre:'uva', origen:'León', precio:3.2, descripcion:'Uva procedente de león.', foto:'https://i.ibb.co/HnSzg1b/reineta.jpg'}, 200);
    });
});

describe('listar productos ', () => {
    it('todos los productos',async () => {
        var response:Response = await request(app).get("/products/list").set('Accept', 'application/json');
        
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(4);
        await compareResponseBody(response.body[0], {nombre:"manzana reineta", origen:"Gijón", precio:2.5, descripcion:"Manzana reineta", foto: "https://i.ibb.co/HnSzg1b/reineta.jpg"});
        await compareResponseBody(response.body[1], {nombre:"manzana golden", origen:"Lugo", precio:3, descripcion:"Manzana golden", foto: "https://i.ibb.co/YZbKwjh/golden.jpg"});
        await compareResponseBody(response.body[2], {nombre:"mango", origen:"Colombia", precio:5, descripcion:"mango", foto: "https://i.ibb.co/mhbdbbd/mango.jpg"});
        await compareResponseBody(response.body[3], {nombre:"uva", origen:"León", precio:3.2, descripcion:"Uva procedente de león.", foto: "https://i.ibb.co/HnSzg1b/reineta.jpg"});
    });

    it('por id',async () => {
        var response:Response = await request(app).get("/products/id=621f7f978600d56807483f74").set('Accept', 'application/json');

        expect(response.statusCode).toBe(200);
        await compareResponseBody(response.body, {nombre:"manzana reineta", origen:"Gijón", precio:2.5, descripcion:"Manzana reineta", foto: "https://i.ibb.co/HnSzg1b/reineta.jpg"});
    });

    it('por id - incorrecto',async () => {
        var response:Response = await request(app).get("/products/id=6220e1c1e976d8ae3a9d3e60").set('Accept', 'application/json');
        
        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual({});
    });

    it('por id - inválido',async () => {
        var response:Response = await request(app).get("/products/id=jgfgkjhjg").set('Accept', 'application/json');
        
        expect(response.statusCode).toBe(500);
    });
})

describe("editar producto ", () =>{
    it('id incorrecto ', async () => {
        await probarEditarProducto({_id: '6220e1c1e976d8ae3a9d3e60', nombre:'Manzana Reineta', origen:'Asturias', precio:2, descripcion:'Manzana reineta gucci', foto:'https://i.ibb.co/HnSzg1b/golden.jpg'}, 500);
    })

    it('id inválido ', async () => {
        await probarEditarProducto({_id: 'asdasd', nombre:'Manzana Reineta', origen:'Asturias', precio:2, descripcion:'Manzana reineta gucci', foto:'https://i.ibb.co/HnSzg1b/golden.jpg'}, 500);
    })

    it('sin id ', async () => {
        await probarEditarProducto({ nombre:'Manzana Reineta', origen:'Asturias', precio:2, descripcion:'Manzana reineta gucci', foto:'https://i.ibb.co/HnSzg1b/golden.jpg'}, 500);
    })

    it('nombre = ""', async () => {
        await probarEditarProducto({_id: '621f7f978600d56807483f74', nombre:'', origen:'Asturias', precio:2, descripcion:'Manzana reineta gucci', foto:'https://i.ibb.co/HnSzg1b/golden.jpg'}, 200);
        var response:Response = await request(app).get("/products/id=621f7f978600d56807483f74").set('Accept', 'application/json');

        expect(response.statusCode).toBe(200);
        await compareResponseBody(response.body, {nombre:'manzana reineta', origen:'Asturias', precio:2, descripcion:'Manzana reineta gucci', foto:'https://i.ibb.co/HnSzg1b/golden.jpg'});
    })

    it('sin nombre ', async () => {
        await probarEditarProducto({_id: '621f7f978600d56807483f74', origen:'Gijón', precio:2.5, descripcion:'Manzana reineta', foto:'https://i.ibb.co/HnSzg1b/reineta.jpg'}, 200);
        var response:Response = await request(app).get("/products/id=621f7f978600d56807483f74").set('Accept', 'application/json');

        expect(response.statusCode).toBe(200);
        await compareResponseBody(response.body, {nombre:'manzana reineta', origen:'Gijón', precio:2.5, descripcion:'Manzana reineta', foto:'https://i.ibb.co/HnSzg1b/reineta.jpg'});
    })

    it('origen = "" ', async () => {
        await probarEditarProducto({_id: '621f7f978600d56807483f74', nombre:'Manzana Reineta', origen:'', precio:2, descripcion:'Manzana reineta gucci', foto:'https://i.ibb.co/HnSzg1b/golden.jpg'}, 200);
        var response:Response = await request(app).get("/products/id=621f7f978600d56807483f74").set('Accept', 'application/json');

        expect(response.statusCode).toBe(200);
        await compareResponseBody(response.body, {nombre:'Manzana Reineta', origen:'Gijón', precio:2, descripcion:'Manzana reineta gucci', foto:'https://i.ibb.co/HnSzg1b/golden.jpg'});
    })

    it('sin origen ', async () => {
        await probarEditarProducto({_id: '621f7f978600d56807483f74', nombre:'manzana reineta', precio:2.5, descripcion:'Manzana reineta', foto:'https://i.ibb.co/HnSzg1b/reineta.jpg'}, 200);
        var response:Response = await request(app).get("/products/id=621f7f978600d56807483f74").set('Accept', 'application/json');

        expect(response.statusCode).toBe(200);
        await compareResponseBody(response.body, {nombre:'manzana reineta', origen:'Gijón', precio:2.5, descripcion:'Manzana reineta', foto:'https://i.ibb.co/HnSzg1b/reineta.jpg'});
    })

    it('sin precio ', async () => {
        await probarEditarProducto({_id: '621f7f978600d56807483f74', nombre:'Manzana Reineta', origen:'Asturias', descripcion:'Manzana reineta gucci', foto:'https://i.ibb.co/HnSzg1b/golden.jpg'}, 200);
        var response:Response = await request(app).get("/products/id=621f7f978600d56807483f74").set('Accept', 'application/json');

        expect(response.statusCode).toBe(200);
        await compareResponseBody(response.body, {nombre:'Manzana Reineta', origen:'Asturias', precio:2.5, descripcion:'Manzana reineta gucci', foto:'https://i.ibb.co/HnSzg1b/golden.jpg'});
    })

    it('precio < 0 ', async () => {
        await probarEditarProducto({_id: '621f7f978600d56807483f74', nombre:'manzana reineta', origen:'Gijón', precio:-2, descripcion:'Manzana reineta', foto:'https://i.ibb.co/HnSzg1b/reineta.jpg'}, 200);
        var response:Response = await request(app).get("/products/id=621f7f978600d56807483f74").set('Accept', 'application/json');

        expect(response.statusCode).toBe(200);
        await compareResponseBody(response.body, {nombre:'manzana reineta', origen:'Gijón', precio:2.5, descripcion:'Manzana reineta', foto:'https://i.ibb.co/HnSzg1b/reineta.jpg'});
    })

    it('descripcion = "" ', async () => {
        await probarEditarProducto({_id: '621f7f978600d56807483f74', nombre:'Manzana Reineta', origen:'Asturias', precio:2, descripcion:'', foto:'https://i.ibb.co/HnSzg1b/golden.jpg'}, 200);
        var response:Response = await request(app).get("/products/id=621f7f978600d56807483f74").set('Accept', 'application/json');

        expect(response.statusCode).toBe(200);
        await compareResponseBody(response.body, {nombre:'Manzana Reineta', origen:'Asturias', precio:2, descripcion:'Manzana reineta', foto:'https://i.ibb.co/HnSzg1b/golden.jpg'});
    })

    it('sin descripcion ', async () => {
        await probarEditarProducto({_id: '621f7f978600d56807483f74', nombre:'manzana reineta', origen:'Gijón', precio:2.5, foto:'https://i.ibb.co/HnSzg1b/reineta.jpg'}, 200);
        var response:Response = await request(app).get("/products/id=621f7f978600d56807483f74").set('Accept', 'application/json');

        expect(response.statusCode).toBe(200);
        await compareResponseBody(response.body, {nombre:'manzana reineta', origen:'Gijón', precio:2.5, descripcion:'Manzana reineta', foto:'https://i.ibb.co/HnSzg1b/reineta.jpg'});        
    })

    it('foto = "" ', async () => {
        await probarEditarProducto({_id: '621f7f978600d56807483f74', nombre:'Manzana Reineta', origen:'Asturias', precio:2, descripcion:'Manzana reineta gucci', foto:''}, 200);
        var response:Response = await request(app).get("/products/id=621f7f978600d56807483f74").set('Accept', 'application/json');

        expect(response.statusCode).toBe(200);
        await compareResponseBody(response.body, {nombre:'Manzana Reineta', origen:'Asturias', precio:2, descripcion:'Manzana reineta gucci', foto:'https://i.ibb.co/HnSzg1b/reineta.jpg'});
    })

    it('sin foto ', async () => {
        await probarEditarProducto({_id: '621f7f978600d56807483f74', nombre:'manzana reineta', origen:'Gijón', precio:2.5, descripcion:'Manzana reineta'}, 200);
        var response:Response = await request(app).get("/products/id=621f7f978600d56807483f74").set('Accept', 'application/json');

        expect(response.statusCode).toBe(200);
        await compareResponseBody(response.body, {nombre:'manzana reineta', origen:'Gijón', precio:2.5, descripcion:'Manzana reineta', foto:'https://i.ibb.co/HnSzg1b/reineta.jpg'});
    })

    it('correctamente ', async () => {
        console.log("correctamente:")
        await probarEditarProducto({_id: '621f7f978600d56807483f74', nombre:'Manzana Reineta', origen:'Asturias', precio:2, descripcion:'Manzana reineta gucci', foto:'https://i.ibb.co/HnSzg1b/golden.jpg'}, 200);
        var response:Response = await request(app).get("/products/id=621f7f978600d56807483f74").set('Accept', 'application/json');

        expect(response.statusCode).toBe(200);
        await compareResponseBody(response.body, {nombre:'Manzana Reineta', origen:'Asturias', precio:2, descripcion:'Manzana reineta gucci', foto:'https://i.ibb.co/HnSzg1b/golden.jpg'});
    })
})

describe("eliminar producto ", () =>{
    it('existente', async () => {
        await probarDelete({_id:"621f7f978600d56807483f74"},200);
        var response:Response = await request(app).get("/products/id=621f7f978600d56807483f74").set('Accept', 'application/json');
        
        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual({});
    })

    it('inexistente', async () => {
        await probarDelete({_id:"621f7f978600d56807483f74"},200);
    })
})

async function probarAddProductos(arg0: {nombre?: string, origen?:string, precio?:number, descripcion?:string, foto?:string}, code:number):Promise<Response>{
    const response:Response = await request(app).post('/products/add').send(arg0).set('Accept', 'application/json');
    expect(response.statusCode).toBe(code);
    return response;
}

async function probarEditarProducto(arg0: {_id?: string, nombre?: string, origen?:string, precio?:number, descripcion?:string, foto?:string}, code:number):Promise<Response>{
    console.log(arg0);
    const response:Response = await request(app).post('/products/editar').send(arg0).set('Accept', 'application/json');
    expect(response.statusCode).toBe(code);
    return response;
}

async function probarDelete(arg0: { _id?: string; }, code:number): Promise<Response> {
    const response:Response = await request(app).post('/products/delete').send(arg0).set('Accept', 'application/json');
    expect(response.statusCode).toBe(code);
    return response;
}

async function compareResponseBody(body: any, arg1:{nombre?: string, origen?:string, precio?:number, descripcion?:string, foto?:string}) {
    expect(body.nombre).toBe(arg1.nombre);
    expect(body.origen).toBe(arg1.origen);
    expect(body.precio).toBe(arg1.precio);
    expect(body.descripcion).toBe(arg1.descripcion);
    expect(body.foto).toBe(arg1.foto);
}