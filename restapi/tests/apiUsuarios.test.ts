import path from 'path';

var dotenvPath = path.resolve('../.env');
require("dotenv").config({path: dotenvPath});

import request, {Response} from 'supertest';
import { Application } from 'express';
import * as http from 'http';
import bcrypt from 'bcrypt';
import {createApp, createServer, closeServer, loadDatabase} from './setServerForTests';
import apiUsuarios from '../usuarios/apiUsuarios';

let app:Application;
let server:http.Server;

beforeAll(async () => {
    app = createApp();
    app.use(apiUsuarios);

    server = createServer(app);  
    await loadDatabase(); 
});

afterAll(async () => {
    await closeServer(server);
})

describe('añadir usuario ', () => {
    it('nombre = ""', async () => {
        await probarAddUsuarios({nombre:'', email:'gonzalezgpablo@uniovi.com', dni:'12345678a',contraseña:'1234'}, 500);
    });

    it('sin nombre', async () => {
        await probarAddUsuarios({email:'gonzalezgpablo@uniovi.com', dni:'12345678a',contraseña:'1234'}, 500);
    });

    it('email = ""', async () => {
        await probarAddUsuarios({nombre:'Pablo', email:'', dni:'12345678a',contraseña:'1234'}, 500);
    });

    it('sin email', async () => {
        await probarAddUsuarios({nombre:'Pablo', dni:'12345678a', contraseña:'1234'}, 500);
    });

    it('dni = ""', async () => {
        await probarAddUsuarios({nombre:'Pablo', email:'gonzalezgpablo@uniovi.com', dni:'',contraseña:'1234'}, 500);
    });

    it('sin dni', async () => {
        await probarAddUsuarios({nombre:'Pablo', email:'gonzalezgpablo@uniovi.com', contraseña:'1234'}, 500);
    });

    it('contraseña = ""', async () => {
        await probarAddUsuarios({nombre:'Pablo', email:'gonzalezgpablo@uniovi.com', dni:'12345678a',contraseña:''}, 500);
    });

    it('sin contraseña', async () => {
        await probarAddUsuarios({nombre:'Pablo', email:'gonzalezgpablo@uniovi.com', dni:'12345678a'}, 500);
    });

    it('con email sin .es ni .com', async () => {
        await probarAddUsuarios({nombre:'Pablo', email:'gonzalezgpablo@uniovi', dni:'12345678a',contraseña:'1234'}, 500);
    });

    it('con email sin @', async () => {
        await probarAddUsuarios({nombre:'Pablo', email:'gonzalezgpablouniovi.com', dni:'12345678a',contraseña:'1234'}, 500);
    });

    it('con dni invalido', async () => {
        await probarAddUsuarios({nombre:'Pablo', email:'gonzalezgpablo@uniovi.com', dni:'1234',contraseña:'1234'}, 500);
    });

    it('correctamente', async () => {
        await probarAddUsuarios({_id: '623b1d8889b169d070b43641', nombre:'Pablo', email:'gonzalezgpablo@uniovi.es', dni:'12345678a', contraseña:'1234'}, 200);
    });

    it('repetido', async () => {
        await probarAddUsuarios({nombre:'Pablo', email:'gonzalezgpablo@uniovi.es', dni:'12345678a',contraseña:'1234'}, 500);
    });
    
});

describe('listar usuarios ', () => {
    it('todos los usuarios',async () => {
        var response:Response = await request(app).get("/users/list").set('Accept', 'application/json');
        
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(3);
        await compareResponseBody(response.body[0], {nombre:"admin", email:"admin@email.com", dni:"00000001a", contraseña:"1234"});
        await compareResponseBody(response.body[1], {nombre:"adrian", email:"adrian@email.com", dni:"00000002a", contraseña:"1234"});
        await compareResponseBody(response.body[2], {nombre:"pablo", email:"gonzalezgpablo@uniovi.es", dni:"12345678a", contraseña:"1234"});
    });

    it('por email',async () => {
        var response:Response = await request(app).get("/users/email=gonzalezgpablo@uniovi.es").set('Accept', 'application/json');
        
        expect(response.statusCode).toBe(200);
        await compareResponseBody(response.body, {nombre:"pablo", email:"gonzalezgpablo@uniovi.es", dni:"12345678a", contraseña:"1234"});
    });

    it('por email - incorrecto',async () => {
        var response:Response = await request(app).get("/users/email=gonzgpablo@uniovi.es").set('Accept', 'application/json');
        
        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual({});
    });

    it('por dni',async () => {
        var response:Response = await request(app).get("/users/dni=12345678a").set('Accept', 'application/json');

        expect(response.statusCode).toBe(200);
        await compareResponseBody(response.body, {nombre:"pablo", email:"gonzalezgpablo@uniovi.es", dni:"12345678a", contraseña:"1234"});
    });

    it('por dni - incorrecto',async () => {
        var response:Response = await request(app).get("/users/dni=125678a").set('Accept', 'application/json');
        
        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual({});
    });

    it('por id',async () => {
        var response:Response = await request(app).get("/users/id=6220e1c1e976d8ae3a9d3e60").set('Accept', 'application/json');

        expect(response.statusCode).toBe(200);
        await compareResponseBody(response.body, {nombre:"adrian", email:"adrian@email.com", dni:"00000002a", contraseña:"1234"});
    });

    it('por id - incorrecto',async () => {
        var response:Response = await request(app).get("/users/id=621f7f978600d56807483f74").set('Accept', 'application/json');
        
        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual({});
    });

    it('por id - inválido',async () => {
        var response:Response = await request(app).get("/users/id=jgfgkjhjg").set('Accept', 'application/json');
        
        expect(response.statusCode).toBe(500);
    });
})

describe("login ", () => {
    it("correcto", async () => {
        const response:Response = await probarLogin({email:"admin@email.com",contraseña:"1234"}, 200);
        expect(response.body).toBe("admin@email.com");
    })

    it("incorrecto - mala contraseña", async () => {
        await probarLogin({email:"admin@email.com",contraseña:"asdr"}, 412);
    })

    it("incorrecto - mal usuario", async () => {
        await probarLogin({email:"incorrecto@email.com",contraseña:"1234"}, 412);
    })

    it("incorrecto - falta contraseña", async () => {
        await probarLogin({email:"admin@email.com"}, 500);
    })

    it("incorrecto - falta email", async () => {
        await probarLogin({contraseña:"1234"}, 500);
    })
})

describe("eliminar usuario ", () =>{
    it('existente', async () => {
        probarDelete({_id:"6220e1c1e976d8ae3a9d3e60"},200);
        var response:Response = await request(app).get("/users/id=6220e1c1e976d8ae3a9d3e60").set('Accept', 'application/json');
        
        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual({});
    })

    it('inexistente', async () => {
        probarDelete({_id:"6220e1c1e976d8ae3a9d3e60"},200);
    })
})

async function probarAddUsuarios(arg0: {_id?:string, nombre?: string, email?:string, dni?:string, contraseña?:string}, code:number):Promise<Response>{
    const response:Response = await request(app).post('/users/add').send(arg0).set('Accept', 'application/json');
    expect(response.statusCode).toBe(code);
    return response;
}

async function probarLogin(arg0: { email?: string; contraseña?: string; }, code:number): Promise<Response> {
    const response:Response = await request(app).post('/users/login').send(arg0).set('Accept', 'application/json');
    expect(response.statusCode).toBe(code);
    return response;
}

async function probarDelete(arg0: { _id?: string; }, code:number): Promise<Response> {
    const response:Response = await request(app).post('/users/delete').send(arg0).set('Accept', 'application/json');
    expect(response.statusCode).toBe(code);
    return response;
}

async function compareResponseBody(body: any, arg1: { nombre: string; email: string; dni: string; contraseña: string; }) {
    expect(body.nombre).toBe(arg1.nombre);
    expect(body.email).toBe(arg1.email);
    expect(body.dni).toBe(arg1.dni);
    
    let contraCorrecta: boolean = await bcrypt.compare(arg1.contraseña, body.contraseña);
    expect(contraCorrecta).toBe(true);
}
