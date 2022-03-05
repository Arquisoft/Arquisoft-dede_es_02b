import express, { Request, Response, Router } from 'express';
import mongoose from 'mongoose';
import Usuario from './schemas/Usuario';
import Producto from './schemas/Producto';

import bcrypt from 'bcrypt';
import { Console } from 'console';

mongoose.connect("mongodb+srv://admin:Xv66rrHLF5argEOb@dedees2b.e6i7s.mongodb.net/Dede?retryWrites=true&w=majority").then(() => console.log("BD conectada"))

const api:Router = express.Router()

api.get(
  "/users/list",
  async (req: Request, res: Response): Promise<Response> => {
      let users = await Usuario.find().select("nombre").select("dni").select("email") 
      return res.status(200).send(users);
  }
);

api.post(
  "/users/login",
  async (req: Request, res: Response): Promise<Response> =>{
    let correo = req.body.email.toLowerCase();
    if(await Usuario.exists({ email: correo})){
      let user = await Usuario.findOne().where("email").equals(correo.toLowerCase());
    
      try{
        if(await bcrypt.compare(req.body.contraseña, user.contraseña)){
          return res.status(200).send("Success");
        }else{
          return res.status(400).send("Contraseña erronea");
        }
      }catch{
        return res.sendStatus(500);
      }

    }else{
      return res.status(400).send("Usuario no encontrado");
    }
  }
);

api.post( 
  "/users/add",
  async (req: Request, res: Response): Promise<Response> => {
    try{
      let usuario = new Usuario();
      usuario.nombre = req.body.nombre;
      usuario.email = req.body.email;
      usuario.dni = req.body.dni;
      
      const hashedPass = await bcrypt.hash(req.body.contraseña, 10);
      usuario.contraseña = hashedPass;

      await usuario.save();
      return res.sendStatus(200); 
    }catch{
      return res.sendStatus(500)
    }
  }
);

api.get(
  "/products/list",
  async (req: Request, res: Response): Promise<Response> => {
      let productos = await Producto.find().select("nombre").select("origen").select("precio").select("descripcion")
      console.log(productos);
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

api.post(
  "/products/delete",
  async (req: Request, res: Response): Promise<Response> => {
    Producto.findById(req.body.id_producto).deleteOne().exec();
    return res.sendStatus(200);
  }
);

export default api;