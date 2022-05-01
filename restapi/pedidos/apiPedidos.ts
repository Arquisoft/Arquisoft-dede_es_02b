import express, { Request, Response, Router } from 'express';
import Producto from '../productos/ProductoSchema';
import Usuario from '../usuarios/UsuarioSchema';
import Pedido from './PedidoSchema';

const apiPedidos:Router = express.Router();

apiPedidos.post(
  "/pedidos/add",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      let pedido = new Pedido();
      
      pedido.numero_pedido = req.body.numero_pedido;

      if(!req.body.id_usuario)
        throw new Error();

      let usuario = await Usuario.findById(req.body.id_usuario);
      
      if(!usuario)
        return res.sendStatus(412);

      pedido.id_usuario = req.body.id_usuario;
      

      pedido.precio_total = req.body.precio_total;
      pedido.estado = req.body.estado;
      pedido.fecha = new Date();

      if(!req.body.lista_productos)
        return res.sendStatus(412);

       

      for(let producto of req.body.lista_productos){
        if(!producto.id_producto)
          throw new Error();

        let p = await Producto.findById(producto.id_producto);

        if(!p)
          return res.sendStatus(412);
      }

      pedido.lista_productos = req.body.lista_productos;
      
      pedido.direccion = req.body.direccion;
      pedido.tarjeta = req.body.tarjeta;
      
      await pedido.save();
      return res.sendStatus(200);
    } catch{
      return res.sendStatus(500);
    }
  }
);

apiPedidos.get(
  "/pedidos/list",
  async (_req: Request, res: Response): Promise<Response> => {
    let pedidos = await Pedido.find();
    return res.status(200).send(pedidos);
  }
);

apiPedidos.get(
  "/pedidos/id=:id",
  async (req: Request, res: Response): Promise<Response> => {
    try{
      let pedidos = await Pedido.findById(req.params.id);
      return res.status(200).send(pedidos);
    }catch(Error){
      return res.sendStatus(500);
    }
  }
);

apiPedidos.get(
  "/pedidos/numero_pedido=:numero_pedido",
  async (req: Request, res: Response): Promise<Response> => {
    try{
      let pedidos = await Pedido.findOne({numero_pedido: req.params.numero_pedido}).exec();
      return res.status(200).send(pedidos);
    }catch(Error){
      return res.sendStatus(500);
    }
  }
);

apiPedidos.get(
  "/pedidos/id_usuario=:id_usuario",
  async (req: Request, res: Response): Promise<Response> => {
    try{
      let pedidos = await Pedido.find({id_usuario: req.params.id_usuario}).exec();
      return res.status(200).send(pedidos);
    }catch(Error){
      return res.sendStatus(500);
    }
  }
);

apiPedidos.get(
  "/pedidos/nextNumber",
  async (req: Request, res: Response): Promise<Response> => {
    try{
      let pedidos = await Pedido.find({}).sort({numero_pedido: 'desc'}).limit(1).exec();
      let nextNumber = pedidos[0].numero_pedido+1;
      return res.status(200).send(nextNumber.toString());
    }catch(Error){
      return res.sendStatus(500);
    }
  }
);

apiPedidos.post(
  "/pedidos/editar",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      let query = { numero_pedido: req.body.numero_pedido.toString() };
      let pedido = await Pedido.findOne(query).exec();
      pedido.estado = req.body.estado;
      
      await pedido.save();
      return res.sendStatus(200);
    } catch {
      return res.sendStatus(500);
    }
  }
);

apiPedidos.post(
  "/pedidos/delete",
  async (req: Request, res: Response): Promise<Response> => {
    Pedido.findById(req.body._id).deleteOne().exec();
    return res.sendStatus(200);
  }
);

export default apiPedidos;