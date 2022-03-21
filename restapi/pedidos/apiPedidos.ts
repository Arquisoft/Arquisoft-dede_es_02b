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

        pedido.lista_productos = req.body.lista_productos;
        pedido.precio_total = req.body.precio_total;
        
        pedido.direccion = req.body.direccion;
        pedido.fecha = new Date();

        await pedido.save();
        return res.sendStatus(200);
      } catch {
        return res.sendStatus(500);
      }
    }
  );

export default apiPedidos;