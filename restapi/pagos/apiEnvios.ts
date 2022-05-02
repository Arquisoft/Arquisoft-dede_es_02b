import express, { Request, Response, Router } from 'express';

const ShippingCosts = require('../pagos/shipping');
const apiEnvios:Router = express.Router();


const calculateShippementCost = async (req: Request, res: Response) => {
  const addressTo = JSON.parse(req.body);
    let shippmentCost = 0;
  
    try{
      shippmentCost = await ShippingCosts(addressTo)
  
      return res.status(200).send({coste: shippmentCost});
    } catch (e){
      console.log(e);
      res.status(400).send({msg:"Fallo al calcular costes de envio"});
    }
  }

apiEnvios.get(
  "/envio/calcular",
  async (_req: Request, res: Response): Promise<Response> => {
    let costes = calculateShippementCost(_req, res);
    return res.status(200).send(costes);
  }
);
