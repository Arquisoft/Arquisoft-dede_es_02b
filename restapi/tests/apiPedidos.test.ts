

import request, { Response } from 'supertest';
import { Application } from 'express';
import * as http from 'http';
import { createApp, createServer, closeServer, loadDatabase } from './setServerForTests';
import apiPedidos from '../pedidos/apiPedidos';

let app: Application;
let server: http.Server;

beforeAll(async () => {
    app = createApp();
    app.use(apiPedidos);

    server = createServer(app);
    await loadDatabase();
});

afterAll(async () => {
    await closeServer(server);
})

describe('pedidos ', () => {
    it('correctamente', async () => {
        await probarAddPedidos({ numero_pedido: 2, id_usuario: '6220e1b3e976d8ae3a9d3e5e', lista_productos: [{id_producto:'621f7f978600d56807483f74', cantidad:3, precio:7.5}], precio_total:7.5, direccion:{calle:"calle", localidad:"localidad", provincia:"provincia", pais:"pais", codigo_postal:1}, estado:"Entregado" }, 200);
    });
});

async function probarAddPedidos(arg0: { numero_pedido?: number, id_usuario?: string, lista_productos?: [{ id_producto?: string, cantidad?: number, precio?: number }], precio_total?: number, direccion?: { calle?: string, localidad?: string, provincia?: string, pais?: string, codigo_postal?: number }, estado?: string }, code: number): Promise<Response> {
    const response: Response = await request(app).post('/pedidos/add').send(arg0).set('Accept', 'application/json');
    expect(response.statusCode).toBe(code);
    return response;
}