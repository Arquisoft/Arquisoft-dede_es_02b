import express, { Request, Response, Router } from 'express';
import Producto from './ProductoSchema';

const api: Router = express.Router()

api.get(
  "/products/list",
  async (req: Request, res: Response): Promise<Response> => {
    let productos = await Producto.find();
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

api.get(
  "/products/:id",
  async (req: Request, res: Response): Promise<Response> => {
    let productos = await Producto.findById(req.params.id)
    return res.status(200).send(productos)
  }
);

export default api;