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
        let nombre:string = ''
        let email:string = 'gonzalezgpablo@uniovi.es'
        let dni:string = '12345678a'
        let contraseña:string = '1234'
        const response:Response = await request(app).post('/users/add').send({
            nombre: nombre,
            email: email,
            dni: dni,
            contraseña: contraseña
        }).set('Accept', 'application/json')
        expect(response.statusCode).toBe(500);
    });

    it('sin nombre', async () => {
        let email:string = 'gonzalezgpablo@uniovi.es'
        let dni:string = '12345678a'
        let contraseña:string = '1234'
        const response:Response = await request(app).post('/users/add').send({
            email: email,
            dni: dni,
            contraseña: contraseña
        }).set('Accept', 'application/json')
        expect(response.statusCode).toBe(500);
    });

    it('email = ""', async () => {
        let nombre:string = 'Pablo'
        let email:string = ''
        let dni:string = '12345678a'
        let contraseña:string = '1234'
        const response:Response = await request(app).post('/users/add').send({
            nombre: nombre,
            email: email,
            dni: dni,
            contraseña: contraseña
        }).set('Accept', 'application/json')
        expect(response.statusCode).toBe(500);
    });

    it('sin email', async () => {
        let nombre:string = 'Pablo'
        let dni:string = '12345678a'
        let contraseña:string = '1234'
        const response:Response = await request(app).post('/users/add').send({
            nombre: nombre,
            dni: dni,
            contraseña: contraseña
        }).set('Accept', 'application/json')
        expect(response.statusCode).toBe(500);
    });

    it('dni = ""', async () => {
        let nombre:string = 'Pablo'
        let email:string = 'gonzalezgpablo@uniovi.es'
        let dni:string = ''
        let contraseña:string = '1234'
        const response:Response = await request(app).post('/users/add').send({
            nombre: nombre,
            email: email,
            dni: dni,
            contraseña: contraseña
        }).set('Accept', 'application/json')
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
        let nombre:string = 'Pablo'
        let email:string = 'gonzalezgpablo@uniovi.es'
        let dni:string = '12345678a'
        let contraseña:string = ''
        const response:Response = await request(app).post('/users/add').send({
            nombre: nombre,
            email: email,
            dni: dni,
            contraseña: contraseña
        }).set('Accept', 'application/json')
        expect(response.statusCode).toBe(500);
    });

    it('sin contraseña', async () => {
        let nombre:string = 'Pablo'
        let email:string = 'gonzalezgpablo@uniovi.es'
        let dni:string = '12345678a'
        const response:Response = await request(app).post('/users/add').send({
            nombre: nombre,
            email: email,
            dni: dni
        }).set('Accept', 'application/json')
        expect(response.statusCode).toBe(500);
    });

    it('con email sin .es ni .com', async () => {
        let nombre:string = 'Pablo'
        let email:string = 'gonzalezgpablo@uniovi'
        let dni:string = '12345678a'
        let contraseña:string = '1234'
        const response:Response = await request(app).post('/users/add').send({
            nombre: nombre,
            email: email,
            dni: dni,
            contraseña: contraseña
        }).set('Accept', 'application/json')
        expect(response.statusCode).toBe(500);
    });

    it('con email sin @', async () => {
        let nombre:string = 'Pablo'
        let email:string = 'gonzalezgpablouniovi.es'
        let dni:string = '12345678a'
        let contraseña:string = '1234'
        const response:Response = await request(app).post('/users/add').send({
            nombre: nombre,
            email: email,
            dni: dni,
            contraseña: contraseña
        }).set('Accept', 'application/json')
        expect(response.statusCode).toBe(500);
    });

    it('con dni invalido', async () => {
        let nombre:string = 'Pablo'
        let email:string = 'gonzalezgpablo@uniovi.es'
        let dni:string = '12348a'
        let contraseña:string = '1234'
        const response:Response = await request(app).post('/users/add').send({
            nombre: nombre,
            email: email,
            dni: dni,
            contraseña: contraseña
        }).set('Accept', 'application/json')
        expect(response.statusCode).toBe(500);
    });

    it('correctamente', async () => {
        let _id = '623b1d8889b169d070b43641';
        let nombre:string = 'Pablo'
        let email:string = 'gonzalezgpablo@uniovi.es'
        let dni:string = '12345678a'
        let contraseña:string = '1234'
        const response:Response = await request(app).post('/users/add').send({
            _id: _id,
            nombre: nombre,
            email: email,
            dni: dni,
            contraseña: contraseña
        }).set('Accept', 'application/json')
        expect(response.statusCode).toBe(200);
    });

    it('repetido', async () => {
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
        let email: string = "admin@email.com";
        let contraseña: string = "1234";
        const response:Response = await request(app).post('/users/login').send({
            email: email,
            contraseña: contraseña
        }).set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBe(email);
    })

    it("incorrecto - mala contraseña", async () => {
        let email: string = "admin@email.com";
        let contraseña: string = "asjdkla";
        const response:Response = await request(app).post('/users/login').send({
            email: email,
            contraseña: contraseña
        }).set('Accept', 'application/json');
        expect(response.statusCode).toBe(412);
    })

    it("incorrecto - mal usuario", async () => {
        let email: string = "incorrecto@email.com";
        let contraseña: string = "1234";
        const response:Response = await request(app).post('/users/login').send({
            email: email,
            contraseña: contraseña
        }).set('Accept', 'application/json');
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