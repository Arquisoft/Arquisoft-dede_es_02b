import express, { Request, Response, Router } from 'express';
import {check} from 'express-validator';
import mongoose from 'mongoose';

mongoose.connect("mongodb+srv://admin:Xv66rrHLF5argEOb@dedees2b.e6i7s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")

const api:Router = express.Router()

interface Product {
  id : number;
  name: string;
  quantity: number;
}

interface User {
  name: string;
  email: string;
}
//This is not a restapi as it mantains state but it is here for
//simplicity. A database should be used instead.
let users: Array<User> = [];
let products: Array<Product> = [];

api.get(
    "/users/list",
    async (req: Request, res: Response): Promise<Response> => {
        return res.status(200).send(users);
    }
);

api.post(
  "/users/add",[
    check('name').isLength({ min: 1 }).trim().escape(),
    check('email').isEmail().normalizeEmail(),
  ],
  async (req: Request, res: Response): Promise<Response> => {
    let name = req.body.name;
    let email = req.body.email;
    let user: User = {name:name,email:email}
    users.push(user);
    return res.sendStatus(200);
  }
);

api.post(
  "/products/add",[
    check('name').isLength({ min: 1 }).trim().escape(),
    check('quantity').isNumeric()
  ],
  async (req: Request, res: Response): Promise<Response> => {
    let name = "Pera";
    let id;
    if(products.length == 0){ 
     id = 1;
    }else{
      id = products[products.length-1].id+1;
    }
    
    let product: Product = {id:id, name:name, quantity:0}
    products.push(product);
    return res.sendStatus(200);
  }
);

api.get(
  "/products/list",
  async (req: Request, res: Response): Promise<Response> => {
      return res.status(200).send(products);
  }
);

export default api;