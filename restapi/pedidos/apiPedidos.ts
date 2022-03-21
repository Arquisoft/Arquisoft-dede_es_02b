import express, { Request, Response, Router } from 'express';
import Pedido from './PedidoSchema';

const api:Router = express.Router();

api.post(
    "/pedidos/add",
    async (req: Request, res: Response): Promise<Response> => {
      try {
        let pedido = new Pedido();
        
        pedido.numero_pedido = req.body.numero_pedido;
        pedido.id_usuario = req.body.id_usuario;

        pedido.lista_productos = req.body.lista_productos;
        pedido.precio_total = req.body.precio_total;
        
        pedido.direccion = req.body.direccion;
        // pedido.direccion.calle = req.body.calle;
        // pedido.direccion.localidad = req.body.localidad;
        // pedido.direccion.provincia = req.body.provincia;
        // pedido.direccion.pais = req.body.pais;
        // pedido.direccion.codigo_postal = req.body.codigo_postal;

        pedido.fecha = new Date();

        await pedido.save();
        return res.status(200).send(pedido);
      } catch {
        return res.sendStatus(500);
      }
    }
  );

export default api;