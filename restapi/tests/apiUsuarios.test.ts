import request, { Response } from 'supertest';
import { Application } from 'express';
import * as http from 'http';
import bcrypt from 'bcrypt';
import { createApp, createServer, closeServer, loadDatabase } from './setServerForTests';
import apiUsuarios from '../usuarios/apiUsuarios';

let app: Application;
let server: http.Server;

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
        await probarAddUsuarios({ nombre: '', apellidos:'apellido', email: 'gonzalezgpablo@uniovi.com', dni: '12345678a', contraseña: '1234' }, 500);
    });

    it('sin nombre', async () => {
        await probarAddUsuarios({ apellidos:'apellido', email: 'gonzalezgpablo@uniovi.com', dni: '12345678a', contraseña: '1234' }, 500);
    });
    it('apellidos = ""', async () => {
        await probarAddUsuarios({ nombre: 'Pablo', apellidos:'', email: 'gonzalezgpablo@uniovi.com', dni: '12345678a', contraseña: '1234' }, 500);
    });
    it('sin apellidos', async () => {
        await probarAddUsuarios({ nombre: 'Pablo', email: 'gonzalezgpablo@uniovi.com', dni: '12345678a', contraseña: '1234' }, 500);
    });

    it('email = ""', async () => {
        await probarAddUsuarios({ nombre: 'Pablo', apellidos:'apellido', email: '', dni: '12345678a', contraseña: '1234' }, 500);
    });

    it('sin email', async () => {
        await probarAddUsuarios({ nombre: 'Pablo',apellidos:'apellido', dni: '12345678a', contraseña: '1234' }, 500);
    });

    it('dni = ""', async () => {
        await probarAddUsuarios({ nombre: 'Pablo', apellidos:'apellido',email: 'gonzalezgpablo@uniovi.com', dni: '', contraseña: '1234' }, 500);
    });

    it('sin dni', async () => {
        await probarAddUsuarios({ nombre: 'Pablo', apellidos:'apellido',email: 'gonzalezgpablo@uniovi.com', contraseña: '1234' }, 500);
    });

    it('contraseña = ""', async () => {
        await probarAddUsuarios({ nombre: 'Pablo', apellidos:'apellido',email: 'gonzalezgpablo@uniovi.com', dni: '12345678a', contraseña: '' }, 500);
    });

    it('sin contraseña', async () => {
        await probarAddUsuarios({ nombre: 'Pablo', apellidos:'apellido',email: 'gonzalezgpablo@uniovi.com', dni: '12345678a' }, 500);
    });

    it('con email sin .es ni .com', async () => {
        await probarAddUsuarios({ nombre: 'Pablo', apellidos:'apellido',email: 'gonzalezgpablo@uniovi', dni: '12345678a', contraseña: '1234' }, 500);
    });

    it('con email sin @', async () => {
        await probarAddUsuarios({ nombre: 'Pablo', apellidos:'apellido',email: 'gonzalezgpablouniovi.com', dni: '12345678a', contraseña: '1234' }, 500);
    });

    it('con dni invalido', async () => {
        await probarAddUsuarios({ nombre: 'Pablo', apellidos:'apellido',email: 'gonzalezgpablo@uniovi.com', dni: '1234', contraseña: '1234' }, 500);
    });

    it('correctamente', async () => {
        await probarAddUsuarios({ _id: '623b1d8889b169d070b43641', nombre: 'pablo', apellidos:'gonzalez', email: 'gonzalezgpablo@uniovi.es', esAdmin:true, dni: '12345678a', contraseña: '1234', idSolid: "idSolid" }, 200);
    });

    it('repetido', async () => {
        await probarAddUsuarios({ nombre: 'Pablo', apellidos:'apellido',email: 'gonzalezgpablo@uniovi.es', dni: '12345678a', contraseña: '1234' }, 500);
    });

});

describe('listar usuarios ', () => {
    it('todos los usuarios', async () => {
        var response: Response = await request(app).get("/users/list").set('Accept', 'application/json');

        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(3);
        await compareResponseBody(response.body[0], { nombre: "admin", apellidos:'admin', email: "admin@email.com", dni: "00000001a", contraseña: "1234", idSolid: "" });
        await compareResponseBody(response.body[1], { nombre: "adrian", apellidos:'fernández', email: "adrian@email.com", dni: "00000002a", contraseña: "1234" , idSolid: "Adrifa"});
        await compareResponseBody(response.body[2], { nombre: "pablo", apellidos:'gonzalez',email: "gonzalezgpablo@uniovi.es", dni: "12345678a", contraseña: "1234", idSolid: "idSolid" });
    });

    it('por email', async () => {
        var response: Response = await request(app).get("/users/email=gonzalezgpablo@uniovi.es").set('Accept', 'application/json');

        expect(response.statusCode).toBe(200);
        await compareResponseBody(response.body, { nombre: "pablo", apellidos:'gonzalez',email: "gonzalezgpablo@uniovi.es", dni: "12345678a", contraseña: "1234", idSolid: "idSolid" });
    });

    it('por email - incorrecto', async () => {
        var response: Response = await request(app).get("/users/email=gonzgpablo@uniovi.es").set('Accept', 'application/json');

        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual({});
    });

    it('por dni', async () => {
        var response: Response = await request(app).get("/users/dni=12345678a").set('Accept', 'application/json');

        expect(response.statusCode).toBe(200);
        await compareResponseBody(response.body, { nombre: "pablo", apellidos:'gonzalez',email: "gonzalezgpablo@uniovi.es", dni: "12345678a", contraseña: "1234", idSolid: "idSolid" });
    });

    it('por dni - incorrecto', async () => {
        var response: Response = await request(app).get("/users/dni=125678a").set('Accept', 'application/json');

        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual({});
    });

    it('por id', async () => {
        var response: Response = await request(app).get("/users/id=6220e1c1e976d8ae3a9d3e60").set('Accept', 'application/json');

        expect(response.statusCode).toBe(200);
        await compareResponseBody(response.body, { nombre: "adrian", apellidos:"fernández", email: "adrian@email.com", dni: "00000002a", contraseña: "1234", idSolid: "Adrifa" });
    });

    it('por id - incorrecto', async () => {
        var response: Response = await request(app).get("/users/id=621f7f978600d56807483f74").set('Accept', 'application/json');

        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual({});
    });

    it('por id - inválido', async () => {
        var response: Response = await request(app).get("/users/id=jgfgkjhjg").set('Accept', 'application/json');

        expect(response.statusCode).toBe(500);
    });
})

describe("login ", () => {
    it("correcto", async () => {
        const response: Response = await probarLogin({ email: "admin@email.com", contraseña: "1234" }, 200);
        expect(response.body).toStrictEqual({
            "_id": "6220e1b3e976d8ae3a9d3e5e",
            "nombre": "admin",
            "apellidos": "admin",
            "email": "admin@email.com",
            "esAdmin": true,
            "dni": "00000001a",
            "contraseña": "$2b$10$I6GUXY4VDqmNfPSeYnWg1uE2NN7u5UcZJ5ozvANYKKP.nuKOb1ija",
            "idSolid": "",
            "__v": 0
        });
    })

    it("incorrecto - mala contraseña", async () => {
        await probarLogin({ email: "admin@email.com", contraseña: "asdr" }, 412);
    })

    it("incorrecto - mal usuario", async () => {
        await probarLogin({ email: "incorrecto@email.com", contraseña: "1234" }, 412);
    })

    it("incorrecto - falta contraseña", async () => {
        await probarLogin({ email: "admin@email.com" }, 500);
    })

    it("incorrecto - falta email", async () => {
        await probarLogin({ contraseña: "1234" }, 500);
    })
})

describe("eliminar usuario ", () => {
    it('existente', async () => {
        await probarDelete({ _id: "6220e1c1e976d8ae3a9d3e60" }, 200);
        var response: Response = await request(app).get("/users/id=6220e1c1e976d8ae3a9d3e60").set('Accept', 'application/json');

        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual({});
    })

    it('inexistente', async () => {
        await probarDelete({ _id: "6220e1c1e976d8ae3a9d3e60" }, 200);
    })
})

async function probarAddUsuarios(arg0: { _id?: string, nombre?: string, apellidos?: string, email?: string, esAdmin?:boolean, dni?: string, contraseña?: string, idSolid?: string }, code: number): Promise<Response> {
    const response: Response = await request(app).post('/users/add').send(arg0).set('Accept', 'application/json');
    expect(response.statusCode).toBe(code);
    return response;
}

async function probarLogin(arg0: { email?: string; contraseña?: string; }, code: number): Promise<Response> {
    const response: Response = await request(app).post('/users/login').send(arg0).set('Accept', 'application/json');
    expect(response.statusCode).toBe(code);
    return response;
}

async function probarDelete(arg0: { _id?: string; }, code: number): Promise<Response> {
    const response: Response = await request(app).post('/users/delete').send(arg0).set('Accept', 'application/json');
    expect(response.statusCode).toBe(code);
    return response;
}

async function compareResponseBody(body: any, arg1: { nombre: string; apellidos: string; email: string; dni: string; contraseña: string; idSolid: string; }) {
    expect(body.nombre).toBe(arg1.nombre);
    expect(body.apellidos).toBe(arg1.apellidos);
    expect(body.email).toBe(arg1.email);
    expect(body.dni).toBe(arg1.dni);
    expect(body.idSolid).toBe(arg1.idSolid);

    let contraCorrecta: boolean = await bcrypt.compare(arg1.contraseña, body.contraseña);
    expect(contraCorrecta).toBe(true);
}
