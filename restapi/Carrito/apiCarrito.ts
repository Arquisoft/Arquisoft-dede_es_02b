import express, { Request, Response, Router } from 'express';

const apiCarrito:Router = express.Router()

apiCarrito.post(
    "/cart/add",
    async (req: Request, res: Response): Promise<Response> => {
          return res.sendStatus(200);
    }
  );
  
export default apiCarrito;