import express, { Request, Response, Router } from 'express';
import {check} from 'express-validator';
import mongoose from 'mongoose';
import { userInfo } from 'os';
import Usuario from './schemas/Usuario';

const Producto = require('./schemas/Producto')

mongoose.connect("mongodb+srv://admin:Xv66rrHLF5argEOb@dedees2b.e6i7s.mongodb.net/Dede?retryWrites=true&w=majority").then(() => console.log("BD conectada"))

const api:Router = express.Router()

/* api.get(
    "/users/list",
    async (req: Request, res: Response): Promise<Response> => {
        return res.status(200).send(users);
    }
);

api.post(
  "/users/add",[
    check('name').isLength({ min: 1 }).trim().escape(),
    check('email').isEmail().normalizeEmail(),
  ],
  async (req: Request, res: Response): Promise<Response> => {
    let name = req.body.name;
    let email = req.body.email;
    let user: User = {name:name,email:email}
    users.push(user);
    return res.sendStatus(200);
  }
);

api.post(
  "/products/add",[
    check('name').isLength({ min: 1 }).trim().escape(),
    check('quantity').isNumeric()
  ],
  async (req: Request, res: Response): Promise<Response> => {
    let name = "Pera";
    let id;
    if(products.length == 0){ 
     id = 1;
    }else{
      id = products[products.length-1].id+1;
    }
    
    let product: Product = {id:id, name:name, quantity:0}
    products.push(product);
    return res.sendStatus(200);
  }
);*/

api.get(
  "/users/list",
  async (req: Request, res: Response): Promise<Response> => {
      let users = await Usuario.find().select("nombre").select("dni").select("email") 
      return res.status(200).send(users);
  }
);

api.post( 
  "/users/add",
  async (req: Request, res: Response): Promise<Response> => {
    let usuario = new Usuario();
    usuario.nombre = req.body.nombre;
    usuario.email = req.body.email;
    usuario.dni = req.body.dni;
    usuario.contraseña = req.body.contraseña;
    
    await usuario.save();
    return res.sendStatus(200); 
  }
);

api.get(
  "/products/list",
  async (req: Request, res: Response): Promise<Response> => {
      let productos = await Producto.find().select("nombre").select("origen").select("precio").select("descripcion")
      return res.status(200).send(productos)
  }
); 

api.post(
  "/products/add",
  async (req: Request, res: Response): Promise<Response> => {
    let producto = new Producto();
    producto.nombre = req.body.nombre;
    producto.origen = req.body.origen;
    producto.precio = req.body.precio;
    producto.descripcion = req.body.descripcion;
    
    await producto.save(); 
    return res.sendStatus(200);
  }
);

export default api;