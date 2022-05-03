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

describe("sacar numero siguiente ", () =>{
    it('correcto', async () => {
        const response: Response = await request(app).get('/pedidos/nextNumber').set('Accept', 'application/json'); 
        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual({});
    })
})

describe('añadir pedidos ', () => {
    it('sin numero de pedido', async () => {
        await probarAddPedidos({ id_usuario: '6220e1b3e976d8ae3a9d3e5e', lista_productos: [{ id_producto: '621f7f978600d56807483f74', cantidad: 3, precio: 7.5 }], precio_total: 7.5, direccion: { calle: "calle", localidad: "localidad", provincia: "provincia", pais: "pais", codigo_postal: 1 }, estado: "Entregado" }, 500);
    })

    it('numéro de pedido inválido', async () => {
        await probarAddPedidos({ numero_pedido: -3, id_usuario: '6220e1b3e976d8ae3a9d3e5e', lista_productos: [{ id_producto: '621f7f978600d56807483f74', cantidad: 3, precio: 7.5 }], precio_total: 7.5, direccion: { calle: "calle", localidad: "localidad", provincia: "provincia", pais: "pais", codigo_postal: 1 }, estado: "Entregado" }, 500);
    })

    it('sin id_usuario', async () => {
        await probarAddPedidos({ numero_pedido: 2, lista_productos: [{ id_producto: '621f7f978600d56807483f74', cantidad: 3, precio: 7.5 }], precio_total: 7.5, direccion: { calle: "calle", localidad: "localidad", provincia: "provincia", pais: "pais", codigo_postal: 1 }, estado: "Entregado" }, 500);
    })

    it('id_usuario incorrecto', async () => {
        await probarAddPedidos({ numero_pedido: 2, id_usuario: '621f7f978600d56807483f74', lista_productos: [{ id_producto: '621f7f978600d56807483f74', cantidad: 3, precio: 7.5 }], precio_total: 7.5, direccion: { calle: "calle", localidad: "localidad", provincia: "provincia", pais: "pais", codigo_postal: 1 }, estado: "Entregado" }, 412);
    })

    it('id_usuario inválido', async () => {
        await probarAddPedidos({ numero_pedido: 2, id_usuario: 'jtlkgdjfd', lista_productos: [{ id_producto: '621f7f978600d56807483f74', cantidad: 3, precio: 7.5 }], precio_total: 7.5, direccion: { calle: "calle", localidad: "localidad", provincia: "provincia", pais: "pais", codigo_postal: 1 }, estado: "Entregado" }, 500);
    })

    it('sin lista de productos', async () => {
        await probarAddPedidos({ numero_pedido: 2, id_usuario: '6220e1b3e976d8ae3a9d3e5e', precio_total: 7.5, direccion: { calle: "calle", localidad: "localidad", provincia: "provincia", pais: "pais", codigo_postal: 1 }, estado: "Entregado" }, 412);
    })

    it('lista de producto sin id_producto', async () => {
        await probarAddPedidos({ numero_pedido: 2, id_usuario: '6220e1b3e976d8ae3a9d3e5e', lista_productos: [{ cantidad: 3, precio: 7.5 }], precio_total: 7.5, direccion: { calle: "calle", localidad: "localidad", provincia: "provincia", pais: "pais", codigo_postal: 1 }, estado: "Entregado" }, 500);
    })

    it('lista de producto con id_producto incorrecto', async () => {
        await probarAddPedidos({ numero_pedido: 2, id_usuario: '6220e1b3e976d8ae3a9d3e5e', lista_productos: [{ id_producto: '6220e1b3e976d8ae3a9d3e5e', cantidad: 3, precio: 7.5 }], precio_total: 7.5, direccion: { calle: "calle", localidad: "localidad", provincia: "provincia", pais: "pais", codigo_postal: 1 }, estado: "Entregado" }, 412);
    })

    it('lista de producto con id_producto inválido', async () => {
        await probarAddPedidos({ numero_pedido: 2, id_usuario: 'asdlkhasf', lista_productos: [{ id_producto: 'adsafawdfasd', cantidad: 3, precio: 7.5 }], precio_total: 7.5, direccion: { calle: "calle", localidad: "localidad", provincia: "provincia", pais: "pais", codigo_postal: 1 }, estado: "Entregado" }, 500);
    })

    it('lista de productos sin cantidad', async () => {
        await probarAddPedidos({ numero_pedido: 2, id_usuario: '6220e1b3e976d8ae3a9d3e5e', lista_productos: [{ id_producto: '621f7f978600d56807483f74', precio: 7.5 }], precio_total: 7.5, direccion: { calle: "calle", localidad: "localidad", provincia: "provincia", pais: "pais", codigo_postal: 1 }, estado: "Entregado" }, 500);
    })

    it('lista de productos con cantidad < 0', async () => {
        await probarAddPedidos({ numero_pedido: 2, id_usuario: '6220e1b3e976d8ae3a9d3e5e', lista_productos: [{ id_producto: '621f7f978600d56807483f74', cantidad: -2, precio: 7.5 }], precio_total: 7.5, direccion: { calle: "calle", localidad: "localidad", provincia: "provincia", pais: "pais", codigo_postal: 1 }, estado: "Entregado" }, 500);
    })

    it('lista de productos sin precio', async () => {
        await probarAddPedidos({ numero_pedido: 2, id_usuario: '6220e1b3e976d8ae3a9d3e5e', lista_productos: [{ id_producto: '621f7f978600d56807483f74', cantidad: 3 }], precio_total: 7.5, direccion: { calle: "calle", localidad: "localidad", provincia: "provincia", pais: "pais", codigo_postal: 1 }, estado: "Entregado" }, 500);
    })

    it('lista de productos con precio < 0', async () => {
        await probarAddPedidos({ numero_pedido: 2, id_usuario: '6220e1b3e976d8ae3a9d3e5e', lista_productos: [{ id_producto: '621f7f978600d56807483f74', cantidad: 3, precio: -7.5 }], precio_total: 7.5, direccion: { calle: "calle", localidad: "localidad", provincia: "provincia", pais: "pais", codigo_postal: 1 }, estado: "Entregado" }, 500);
    })

    it('sin precio total ', async () => {
        await probarAddPedidos({ numero_pedido: 2, id_usuario: '6220e1b3e976d8ae3a9d3e5e', lista_productos: [{ id_producto: '621f7f978600d56807483f74', cantidad: 3, precio: 7.5 }], direccion: { calle: "calle", localidad: "localidad", provincia: "provincia", pais: "pais", codigo_postal: 1 }, estado: "Entregado" }, 500);
    });

    it('con precio total < 0 ', async () => {
        await probarAddPedidos({ numero_pedido: 2, id_usuario: '6220e1b3e976d8ae3a9d3e5e', lista_productos: [{ id_producto: '621f7f978600d56807483f74', cantidad: 3, precio: 7.5 }], precio_total: -7.5, direccion: { calle: "calle", localidad: "localidad", provincia: "provincia", pais: "pais", codigo_postal: 1 }, estado: "Entregado" }, 500);
    });

    it('sin direccion ', async () => {
        await probarAddPedidos({ numero_pedido: 2, id_usuario: '6220e1b3e976d8ae3a9d3e5e', lista_productos: [{ id_producto: '621f7f978600d56807483f74', cantidad: 3, precio: 7.5 }], precio_total: 7.5, estado: "Entregado" }, 500);
    });

    it('con direccion sin calle', async () => {
        await probarAddPedidos({ numero_pedido: 2, id_usuario: '6220e1b3e976d8ae3a9d3e5e', lista_productos: [{ id_producto: '621f7f978600d56807483f74', cantidad: 3, precio: 7.5 }], precio_total: 7.5, direccion: { localidad: "localidad", provincia: "provincia", pais: "pais", codigo_postal: 1 }, estado: "Entregado" }, 500);
    });

    it('con direccion sin localidad ', async () => {
        await probarAddPedidos({ numero_pedido: 2, id_usuario: '6220e1b3e976d8ae3a9d3e5e', lista_productos: [{ id_producto: '621f7f978600d56807483f74', cantidad: 3, precio: 7.5 }], precio_total: 7.5, direccion: { calle: "calle", provincia: "provincia", pais: "pais", codigo_postal: 1 }, estado: "Entregado" }, 500);
    });

    it('con direccion sin provincia ', async () => {
        await probarAddPedidos({ numero_pedido: 2, id_usuario: '6220e1b3e976d8ae3a9d3e5e', lista_productos: [{ id_producto: '621f7f978600d56807483f74', cantidad: 3, precio: 7.5 }], precio_total: 7.5, direccion: { calle: "calle", localidad: "localidad", pais: "pais", codigo_postal: 1 }, estado: "Entregado" }, 500);
    });

    it('con direccion sin pais ', async () => {
        await probarAddPedidos({ numero_pedido: 2, id_usuario: '6220e1b3e976d8ae3a9d3e5e', lista_productos: [{ id_producto: '621f7f978600d56807483f74', cantidad: 3, precio: 7.5 }], precio_total: 7.5, direccion: { calle: "calle", localidad: "localidad", provincia: "provincia", codigo_postal: 1 }, estado: "Entregado" }, 500);
    });

    it('con direccion sin codigo postal ', async () => {
        await probarAddPedidos({ numero_pedido: 2, id_usuario: '6220e1b3e976d8ae3a9d3e5e', lista_productos: [{ id_producto: '621f7f978600d56807483f74', cantidad: 3, precio: 7.5 }], precio_total: 7.5, direccion: { calle: "calle", localidad: "localidad", provincia: "provincia", pais: "pais" }, estado: "Entregado" }, 500);
    });

    it('con direccion con codigo postal < 0', async () => {
        await probarAddPedidos({ numero_pedido: 2, id_usuario: '6220e1b3e976d8ae3a9d3e5e', lista_productos: [{ id_producto: '621f7f978600d56807483f74', cantidad: 3, precio: 7.5 }], precio_total: 7.5, direccion: { calle: "calle", localidad: "localidad", provincia: "provincia", pais: "pais", codigo_postal: -5 }, estado: "Entregado" }, 500);
    });

    it('sin estado ', async () => {
        await probarAddPedidos({ numero_pedido: 2, id_usuario: '6220e1b3e976d8ae3a9d3e5e', lista_productos: [{ id_producto: '621f7f978600d56807483f74', cantidad: 3, precio: 7.5 }], precio_total: 7.5, direccion: { calle: "calle", localidad: "localidad", provincia: "provincia", pais: "pais", codigo_postal: 1 } }, 500);
    });

    it('con estado incorrecto ', async () => {
        await probarAddPedidos({ numero_pedido: 2, id_usuario: '6220e1b3e976d8ae3a9d3e5e', lista_productos: [{ id_producto: '621f7f978600d56807483f74', cantidad: 3, precio: 7.5 }], precio_total: 7.5, direccion: { calle: "calle", localidad: "localidad", provincia: "provincia", pais: "pais", codigo_postal: 1 }, estado: "kljugd" }, 500);
    });

    it('correctamente ', async () => {
        await probarAddPedidos({ numero_pedido: 2, id_usuario: '6220e1b3e976d8ae3a9d3e5e', lista_productos: [{ id_producto: '621f7f978600d56807483f74', cantidad: 3, precio: 7.5 }], precio_total: 7.5, direccion: { calle: "calle", localidad: "localidad", provincia: "provincia", pais: "pais", codigo_postal: 1 }, estado: "Entregado", tarjeta: {numero_tarjeta: 1234, fecha_caducidad: "02/25",numero_seguridad: 111} }, 200);
    });

    it('repetido ', async () => {
        await probarAddPedidos({ numero_pedido: 2, id_usuario: '6220e1b3e976d8ae3a9d3e5e', lista_productos: [{ id_producto: '621f7f978600d56807483f74', cantidad: 3, precio: 7.5 }], precio_total: 7.5, direccion: { calle: "calle", localidad: "localidad", provincia: "provincia", pais: "pais", codigo_postal: 1 }, estado: "Entregado" }, 500);
    });
});

describe("listar pedidos ", () => {
    it('todos los pedidos', async () => {
        var response: Response = await request(app).get("/pedidos/list").set('Accept', 'application/json');

        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(2);
        let lista_productos = [
            {
                id_producto: "621f7f978600d56807483f74",
                cantidad: 3,
                precio: 7.5
            },
            {
                id_producto: "621f7f978600d56807483f76",
                cantidad: 1,
                precio: 3
            }]
        await compareResponseBody(response.body[0], {
            numero_pedido: 1, id_usuario: '6220e1c1e976d8ae3a9d3e60', lista_productos: lista_productos, precio_total: 10.5, direccion: { calle: "camín de güerces 1293 15a", localidad: "gijón", provincia: "asturias", pais: "españa", codigo_postal: 33391 }, estado: "Entregado", tarjeta: {numero_tarjeta: 1234, fecha_caducidad: "02/25",numero_seguridad: 111}});
        await compareResponseBody(response.body[1], { numero_pedido: 2, id_usuario: '6220e1b3e976d8ae3a9d3e5e', lista_productos: [{ id_producto: '621f7f978600d56807483f74', cantidad: 3, precio: 7.5 }], precio_total: 7.5, direccion: { calle: "calle", localidad: "localidad", provincia: "provincia", pais: "pais", codigo_postal: 1 }, estado: "Entregado" });
    });

    it('por id', async () => {
        var response: Response = await request(app).get("/pedidos/id=62385278aa3b8ac2580301dd").set('Accept', 'application/json');

        expect(response.statusCode).toBe(200);
        let lista_productos = [
            {
                id_producto: "621f7f978600d56807483f74",
                cantidad: 3,
                precio: 7.5
            },
            {
                id_producto: "621f7f978600d56807483f76",
                cantidad: 1,
                precio: 3
            }]
        await compareResponseBody(response.body, {
            numero_pedido: 1, id_usuario: '6220e1c1e976d8ae3a9d3e60', lista_productos: lista_productos, precio_total: 10.5, direccion: { calle: "camín de güerces 1293 15a", localidad: "gijón", provincia: "asturias", pais: "españa", codigo_postal: 33391 }, estado: "Entregado"
        });
    });

    it('por id - incorrecto',async () => {
        var response:Response = await request(app).get("/pedidos/id=621f7f978600d56807483f74").set('Accept', 'application/json');
        
        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual({});
    });

    it('por id - inválido',async () => {
        var response:Response = await request(app).get("/pedidos/id=jgfgkjhjg").set('Accept', 'application/json');
        
        expect(response.statusCode).toBe(500);
    });

    it('por numero de pedido', async () => {
        var response: Response = await request(app).get("/pedidos/numero_pedido=1").set('Accept', 'application/json');

        expect(response.statusCode).toBe(200);
        let lista_productos = [
            {
                id_producto: "621f7f978600d56807483f74",
                cantidad: 3,
                precio: 7.5
            },
            {
                id_producto: "621f7f978600d56807483f76",
                cantidad: 1,
                precio: 3
            }]
        await compareResponseBody(response.body, {
            numero_pedido: 1, id_usuario: '6220e1c1e976d8ae3a9d3e60', lista_productos: lista_productos, precio_total: 10.5, direccion: { calle: "camín de güerces 1293 15a", localidad: "gijón", provincia: "asturias", pais: "españa", codigo_postal: 33391 }, estado: "Entregado"
        });
    });

    it('por numero de pedido - incorrecto',async () => {
        var response:Response = await request(app).get("/pedidos/numero_pedido=45").set('Accept', 'application/json');
        
        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual({});
    });

    it('por numero de pedido - inválido',async () => {
        var response:Response = await request(app).get("/pedidos/numero_pedido=jgfgkjhjg").set('Accept', 'application/json');
        
        expect(response.statusCode).toBe(500);
    });

    it('por id de usuario', async () => {
        var response: Response = await request(app).get("/pedidos/id_usuario=6220e1c1e976d8ae3a9d3e60").set('Accept', 'application/json');

        expect(response.statusCode).toBe(200);
        let lista_productos = [
            {
                id_producto: "621f7f978600d56807483f74",
                cantidad: 3,
                precio: 7.5
            },
            {
                id_producto: "621f7f978600d56807483f76",
                cantidad: 1,
                precio: 3
            }]
        await compareResponseBody(response.body[0], {
            numero_pedido: 1, id_usuario: '6220e1c1e976d8ae3a9d3e60', lista_productos: lista_productos, precio_total: 10.5, direccion: { calle: "camín de güerces 1293 15a", localidad: "gijón", provincia: "asturias", pais: "españa", codigo_postal: 33391 }, estado: "Entregado"
        });
    });

    it('por id de usuario - incorrecto',async () => {
        var response:Response = await request(app).get("/pedidos/id_usuario=621f7f978600d56807483f74").set('Accept', 'application/json');
        
        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual([]);
    });

    it('por id de usuario - inválido',async () => {
        var response:Response = await request(app).get("/pedidos/id_usuario=jgfgkjhjg").set('Accept', 'application/json');
        
        expect(response.statusCode).toBe(500);
    });
})

describe("editar pedido ", () => {
    it('existente', async () => {
        await probarEditar({numero_pedido:1, estado:"Pendiente"},200);
        var response:Response = await request(app).get("/pedidos/numero_pedido=1").set('Accept', 'application/json');
        
        expect(response.statusCode).toBe(200);
        let lista_productos = [
            {
                id_producto: "621f7f978600d56807483f74",
                cantidad: 3,
                precio: 7.5
            },
            {
                id_producto: "621f7f978600d56807483f76",
                cantidad: 1,
                precio: 3
            }]
        await compareResponseBody(response.body, {
            numero_pedido: 1, id_usuario: '6220e1c1e976d8ae3a9d3e60', lista_productos: lista_productos, precio_total: 10.5, direccion: { calle: "camín de güerces 1293 15a", localidad: "gijón", provincia: "asturias", pais: "españa", codigo_postal: 33391 }, estado: "Pendiente"
        });
    })

    it('inexistente', async () => {
        await probarEditar({numero_pedido:4, estado:"Pendiente"},500);
    })

    it('existente, estado inválido', async () => {
        await probarEditar({numero_pedido:4, estado:"adwasd"},500);
    })

    it('existente, sin estado', async () => {
        await probarEditar({numero_pedido:4},500);
    })

    it('sin numero de pedido', async () => {
        await probarEditar({estado:"Pendiente"},500);
    })
})



async function probarAddPedidos(arg0: { numero_pedido?: number, id_usuario?: string, lista_productos?: { id_producto?: string, cantidad?: number, precio?: number }[], precio_total?: number, direccion?: { calle?: string, localidad?: string, provincia?: string, pais?: string, codigo_postal?: number }, estado?: string, tarjeta?: {numero_tarjeta?: number, fecha_caducidad?: string,numero_seguridad?: number}}, code: number): Promise<Response> {
    const response: Response = await request(app).post('/pedidos/add').send(arg0).set('Accept', 'application/json');
    expect(response.statusCode).toBe(code);
    return response;
}

async function compareResponseBody(body: any, arg1: { numero_pedido?: number, id_usuario?: string, lista_productos: { id_producto?: string, cantidad?: number, precio?: number }[], precio_total?: number, direccion: { calle?: string, localidad?: string, provincia?: string, pais?: string, codigo_postal?: number }, estado?: string, tarjeta?: {numero_tarjeta?: number, fecha_caducidad?: string,numero_seguridad?: number} }) {
    expect(body.numero_pedido).toBe(arg1.numero_pedido);
    expect(body.id_usuario).toBe(arg1.id_usuario);

    expect(body.direccion.calle).toBe(arg1.direccion.calle);    
    expect(body.direccion.localidad).toBe(arg1.direccion.localidad);
    expect(body.direccion.provincia).toBe(arg1.direccion.provincia);    
    expect(body.direccion.pais).toBe(arg1.direccion.pais);
    expect(body.direccion.codigo_postal).toBe(arg1.direccion.codigo_postal);    

    for(let i = 0; i < body.lista_productos.length; i++){
        expect(body.lista_productos[i].id_producto).toBe(arg1.lista_productos[i].id_producto);
        expect(body.lista_productos[i].cantidad).toBe(arg1.lista_productos[i].cantidad);
        expect(body.lista_productos[i].precio).toBe(arg1.lista_productos[i].precio);
    }

    expect(body.precio_total).toBe(arg1.precio_total);
    expect(body.estado).toBe(arg1.estado);
}

async function probarDelete(arg0: { _id?: string; }, code:number): Promise<Response> {
    const response:Response = await request(app).post('/pedidos/delete').send(arg0).set('Accept', 'application/json');
    expect(response.statusCode).toBe(code);
    return response;
}

async function probarEditar(arg0: { numero_pedido?: number,  estado?: string}, code:number): Promise<Response> {
    const response:Response = await request(app).post('/pedidos/editar').send(arg0).set('Accept', 'application/json');
    expect(response.statusCode).toBe(code);
    return response;
}