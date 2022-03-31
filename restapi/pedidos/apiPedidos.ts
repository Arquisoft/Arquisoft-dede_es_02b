import express, { Request, Response, Router } from 'express';
import Pedido from './PedidoSchema';

const apiPedidos:Router = express.Router();

apiPedidos.post(
  "/pedidos/add",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      let pedido = new Pedido();
      
      pedido.numero_pedido = req.body.numero_pedido;
      pedido.id_usuario = req.body.id_usuario;

      pedido.precio_total = req.body.precio_total;
      pedido.estado = req.body.estado;
      pedido.fecha = new Date();

      pedido.lista_productos = req.body.lista_productos;
      
      pedido.direccion = req.body.direccion;
      
      await pedido.save();
      return res.sendStatus(200);
    } catch {
      console.log("error");
      return res.sendStatus(500);
    }
  }
);

apiPedidos.get(
  "/pedidos/list",
  async (req: Request, res: Response): Promise<Response> => {
    let pedidos = await Pedido.find();
    return res.status(200).send(pedidos);
  }
);

apiPedidos.delete(
  "/pedidos/delete",
  async (req: Request, res: Response): Promise<Response> => {
    Pedido.findById(req.body._id).deleteOne().exec();
    return res.sendStatus(200);
  }
);

export default apiPedidos;