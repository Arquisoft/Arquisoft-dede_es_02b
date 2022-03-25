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
    closeServer(server);
})

describe('añadir usuario ', () => {
    it('nombre = ""', async () => {
        const response:Response = await probarAddUsuarios(null, '', 'gonzalezgpablo@uniovi.com', '','1234');
        expect(response.statusCode).toBe(500);
    });

    it('sin nombre', async () => {
        const response:Response = await request(app).post('/users/add').send({
            email: 'gonzalezgpablo@uniovi.es',
            dni: '12345678a',
            contraseña: '1234'
        }).set('Accept', 'application/json')
        expect(response.statusCode).toBe(500);
    });

    it('email = ""', async () => {
        const response:Response = await probarAddUsuarios(null, 'Pablo', '', '12345678a','1234');
        expect(response.statusCode).toBe(500);
    });

    it('sin email', async () => {
        const response:Response = await request(app).post('/users/add').send({
            nombre: 'Pablo',
            dni: '12345678a',
            contraseña: '1234'
        }).set('Accept', 'application/json')
        expect(response.statusCode).toBe(500);
    });

    it('dni = ""', async () => {
        const response:Response = await probarAddUsuarios(null, 'Pablo', 'gonzalezgpablo@uniovi.com', '','1234');
        expect(response.statusCode).toBe(500);
    });

    it('sin dni', async () => {
        let nombre:string = 'Pablo'
        let email:string = 'gonzalezgpablo@uniovi.es'
        let contraseña:string = '1234'
        const response:Response = await request(app).post('/users/add').send({
            nombre: nombre,
            email: email,
            contraseña: contraseña
        }).set('Accept', 'application/json')
        expect(response.statusCode).toBe(500);
    });

    it('contraseña = ""', async () => {
        const response:Response = await probarAddUsuarios(null, 'Pablo', 'gonzalezgpablo@uniovi.com', '12345678a','');
        expect(response.statusCode).toBe(500);
    });

    it('sin contraseña', async () => {
        const response:Response = await request(app).post('/users/add').send({
            nombre: 'Pablo',
            email: 'gonzalezgpablo@uniovi.es',
            dni: '12345678a'
        }).set('Accept', 'application/json')
        expect(response.statusCode).toBe(500);
    });

    it('con email sin .es ni .com', async () => {
        const response:Response = await probarAddUsuarios(null, 'Pablo', 'gonzalezgpablo@uniovi', '12345678a','1234');
        expect(response.statusCode).toBe(500);
    });

    it('con email sin @', async () => {
        const response:Response = await probarAddUsuarios(null, 'Pablo', 'gonzalezgpablouniovi.es', '12345678a','1234');
        expect(response.statusCode).toBe(500);
    });

    it('con dni invalido', async () => {
        const response:Response = await probarAddUsuarios(null, 'Pablo', 'gonzalezgpablo@uniovi.es', '12345a','1234');
        expect(response.statusCode).toBe(500);
    });

    it('correctamente', async () => {
       const response:Response = await probarAddUsuarios('623b1d8889b169d070b43641', 'Pablo', 'gonzalezgpablo@uniovi.es', '12345678a','1234');
        expect(response.statusCode).toBe(200);
    });

    it('repetido', async () => {
        const response:Response = await probarAddUsuarios(null, 'Pablo', 'gonzalezgpablo@uniovi.es', '12345678a','1234');
        expect(response.statusCode).toBe(500);
    });
    
});

describe('listar usuarios', () => {
    it('todos los usuarios',async () => {
        var response:Response = await request(app).get("/users/list").set('Accept', 'application/json');
        
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(4);
        expect(response.body[response.body.length-1].nombre).toBe("pablo");
        expect(response.body[response.body.length-1].email).toBe("gonzalezgpablo@uniovi.es");
        expect(response.body[response.body.length-1].dni).toBe("12345678a");
        
        let contraCorrecta: boolean = await bcrypt.compare("1234", response.body[3].contraseña)
        expect(contraCorrecta).toBe(true);
    });

    it('por email',async () => {
        var response:Response = await request(app).get("/users/email=gonzalezgpablo@uniovi.es").set('Accept', 'application/json');
        
        expect(response.statusCode).toBe(200);
        expect(response.body.nombre).toBe("pablo");
        expect(response.body.email).toBe("gonzalezgpablo@uniovi.es");
        expect(response.body.dni).toBe("12345678a");
        
        let contraCorrecta: boolean = await bcrypt.compare("1234", response.body.contraseña)
        expect(contraCorrecta).toBe(true);
    });

    it('por email - incorrecto',async () => {
        var response:Response = await request(app).get("/users/email=gonzgpablo@uniovi.es").set('Accept', 'application/json');
        
        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual({});
    });

    it('por dni',async () => {
        var response:Response = await request(app).get("/users/dni=12345678a").set('Accept', 'application/json');
        
        expect(response.statusCode).toBe(200);
        expect(response.body.nombre).toBe("pablo");
        expect(response.body.email).toBe("gonzalezgpablo@uniovi.es");
        expect(response.body.dni).toBe("12345678a");
        
        let contraCorrecta: boolean = await bcrypt.compare("1234", response.body.contraseña)
        expect(contraCorrecta).toBe(true);
    });

    it('por dni - incorrecto',async () => {
        var response:Response = await request(app).get("/users/dni=125678a").set('Accept', 'application/json');
        
        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual({});
    });
})

describe("login ", () => {
    it("correcto", async () => {
        const response:Response = await probarLogin("admin@email.com","1234");
        expect(response.statusCode).toBe(200);
        expect(response.body).toBe("admin@email.com");
    })

    it("incorrecto - mala contraseña", async () => {
        const response:Response = await probarLogin("admin@email.com","asdr");
        expect(response.statusCode).toBe(412);
    })

    it("incorrecto - mal usuario", async () => {
        const response:Response = await probarLogin("incorrecto@email.com","1234");
        expect(response.statusCode).toBe(412);
    })

    it("incorrecto - falta contraseña", async () => {
        let email: string = "admin@email.com";
        const response:Response = await request(app).post('/users/login').send({
            email: email
        }).set('Accept', 'application/json');
        expect(response.statusCode).toBe(500);
    })

    it("incorrecto - falta email", async () => {
        let contraseña: string = "1234";
        const response:Response = await request(app).post('/users/login').send({
            contraseña: contraseña
        }).set('Accept', 'application/json');
        expect(response.statusCode).toBe(500);
    })
})

async function probarAddUsuarios(_id:string|null, nombre: string, email:string, dni:string, contraseña:string):Promise<Response>{
    if(_id){
        return await request(app).post('/users/add').send({
            _id: _id,
            nombre: nombre,
            email: email,
            dni: dni,
            contraseña: contraseña
        }).set('Accept', 'application/json')
   }else{
        return await request(app).post('/users/add').send({
            nombre: nombre,
            email: email,
            dni: dni,
            contraseña: contraseña
        }).set('Accept', 'application/json')
   }
}

async function probarLogin(email:string, contraseña:string):Promise<Response>{
    return await request(app).post('/users/login').send({
        email: email,
        contraseña: contraseña
    }).set('Accept', 'application/json');
}