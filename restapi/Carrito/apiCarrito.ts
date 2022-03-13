import express, { Request, Response, Router } from 'express';
import Cart from './Cart';
import Producto from '../productos/ProductoSchema';

const api:Router = express.Router()
  api.post(
    "/cart/add",
    async (req: Request, res: Response): Promise<Response> => {
      var productId = req.body.id;
      return res.sendStatus(200);
    }
  );
  
export default api;