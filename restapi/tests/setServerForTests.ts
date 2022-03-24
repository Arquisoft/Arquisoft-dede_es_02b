import path from 'path';

var dotenvPath = path.resolve('../.env');
require("dotenv").config({path: dotenvPath});

import express, { Application } from 'express';
import * as http from 'http';
import bp from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import data from './mockData.json';
import Usuario from '../usuarios/UsuarioSchema';
import Producto from '../productos/ProductoSchema';
import Pedido from '../pedidos/PedidoSchema';

export function createApp(): Application{
    let app : Application = express();
    
    const options: cors.CorsOptions = {
        origin: [process.env.CORS_OPTIONS!]
    };

    app.use(cors(options));
    app.use(bp.json());

    return app;
}

export function createServer(app : Application): http.Server{
    const port: string = process.env.PORT!;
    return app.listen(port, ():void => {
        console.log('Restapi server for testing listening on '+ port);
    }).on("error",(error:Error)=>{
        console.error('Error occured: ' + error.message);
    });
}

export async function loadDatabase(){
    const conexiondb: string = process.env.MONGO_URI_TEST!;
    await mongoose.connect(conexiondb) 
    .then(() => console.log("BD conectada"))

    await mockData();
}

export async function closeServer(server: http.Server){
    server.close();
    
    try{
        let collections = await mongoose.connection.db.collections();
        for (let collection of collections) {
            await collection.deleteMany({})
        }

        await mongoose.disconnect();
    }catch{

    }
}

async function mockData() {
    await insertUsers();
    await insertProductos();
    await insertPedidos();
}

async function insertUsers() {
    let i :number;

    for(i=0; i<data.users.length;i++){
        let user = data.users[i];
        let usuario = new Usuario();

        usuario._id = user._id;
        usuario.nombre = user.nombre;
        usuario.email = user.email;
        usuario.dni = user.dni;
        usuario.contraseña = user.contraseña;

        await usuario.save();
    }
}

async function insertProductos() {
    let i :number;

    for(i=0; i<data.productos.length;i++){
        let product = data.productos[i];
        let producto = new Producto();

        producto._id = product._id;
        producto.nombre = product.nombre;
        producto.origen = product.origen;
        producto.precio = product.precio;
        producto.descripcion = product.descripcion;
        producto.foto = product.foto;

        await producto.save();
    }
}

async function insertPedidos() {
    let i :number;

    for(i=0; i<data.pedidos.length;i++){
        let order = data.pedidos[i];
        let pedido = new Pedido();

        pedido._id = order._id;
        pedido.direccion = order.direccion;
        pedido.lista_productos = order.lista_productos;
        pedido.fecha = order.fecha;
        pedido.numero_pedido = order.numero_pedido;
        pedido.id_usuario = order.id_usuario;
        pedido.precio_total = order.precio_total;

        await pedido.save();
    }
}
