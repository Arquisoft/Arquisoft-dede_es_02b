import express, { Request, Response, Router } from 'express';
import Producto from './ProductoSchema';

const apiProductos: Router = express.Router()

apiProductos.get(
  "/products/list",
  async (_req: Request, res: Response): Promise<Response> => {
    let productos = await Producto.find();
    return res.status(200).send(productos)
  }
);

apiProductos.post(
  "/products/add",
  async (req: Request, res: Response): Promise<Response> => {
    try{
      let producto = new Producto();
      producto.nombre = req.body.nombre;
      producto.origen = req.body.origen;
      producto.precio = req.body.precio;
      producto.descripcion = req.body.descripcion;
      producto.foto = req.body.foto;
  
      await producto.save();
      return res.sendStatus(200);
    }catch(Error){
      return res.sendStatus(500);
    }
  }
);

apiProductos.post(
  "/products/delete",
  async (req: Request, res: Response): Promise<Response> => {
    Producto.findById(req.body._id).deleteOne().exec();
    return res.sendStatus(200);
  }
);

apiProductos.get(
  "/products/id=:id",
  async (req: Request, res: Response): Promise<Response> => {
    try{
      let productos = await Producto.findById(req.params.id);
      return res.status(200).send(productos);
    }catch(Error){
      return res.sendStatus(500);
    }
  }
);

apiProductos.post(
  "/products/editar",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      let query = { _id: req.body._id };
      let producto = await Producto.findOne(query).exec();
      
      if(req.body.nombre)
        producto.nombre = req.body.nombre;

      if(req.body.origen)
        producto.origen = req.body.origen;

      if(req.body.precio)
        producto.precio = req.body.precio;

      if(req.body.descripcion)
        producto.descripcion = req.body.descripcion;

      if(req.body.foto)
        producto.foto = req.body.foto;
      
      await producto.save();
      return res.sendStatus(200);
    } catch {
      return res.sendStatus(500);
    }
  }
);

export default apiProductos; 