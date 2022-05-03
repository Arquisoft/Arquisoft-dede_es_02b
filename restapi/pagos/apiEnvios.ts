import express, { Request, Response, Router } from 'express';

const ShippingCosts = require('../pagos/shipping');
const apiEnvios:Router = express.Router();


const calculateShippementCost = async (req: Request, res: Response) => {
    let shippmentCost = 0;
    try{
      shippmentCost = await ShippingCosts(req.body)
      return res.status(200).send({coste: shippmentCost});
    } catch (e){
      console.log(e);
      res.status(400).send({msg:"Fallo al calcular costes de envio"});
    }
  }

apiEnvios.post(
  "/envio/calcular",
  calculateShippementCost
);

export default apiEnvios;
