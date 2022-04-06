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
    let producto = new Producto();
    producto.nombre = req.body.nombre;
    producto.origen = req.body.origen;
    producto.precio = req.body.precio;
    producto.descripcion = req.body.descripcion;
    producto.foto = req.body.foto;

    await producto.save();
    return res.sendStatus(200);
  }
);

apiProductos.delete(
  "/products/delete",
  async (req: Request, res: Response): Promise<Response> => {
    Producto.findById(req.body._id).deleteOne().exec();
    return res.sendStatus(200);
  }
);

apiProductos.get(
  "/products/:id",
  async (req: Request, res: Response): Promise<Response> => {
    let productos = await Producto.findById(req.params.id)
    return res.status(200).send(productos)
  }
);

export default apiProductos; 