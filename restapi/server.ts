require("dotenv").config();

import express, { Application, RequestHandler,  } from "express";
import cors from 'cors';
import bp from 'body-parser';
import promBundle from 'express-prom-bundle';
import mongoose from 'mongoose';
import apiUsuarios from './usuarios/apiUsuarios';
import apiProductos from './productos/apiProductos';
import apiPedidos from './pedidos/apiPedidos';


const app: Application = express();
app.disable("x-powered-by");
const port: string = process.env.PORT||'5000';
const conexiondb: string = process.env.MONGO_URI!;

const conexionEasypost:string = process.env.EASYPOST_API_KEY!;
const EasyPost = require('@easypost/api');
const api = new EasyPost(conexionEasypost);

const address = new api.Address({
  street1: 'Calle Valdes Salas',
  street2: '11',
  city: 'Oviedo',
  state: 'Asturias',
  zip: '33007',
  country: 'ES',
  company: 'DeDe_Es2b',
  phone: '415-123-4567',
});

address.save();

const parcel = new api.Parcel({
  predefined_package: 'FlatRateEnvelope',
  weight: 10,
});

parcel.save();

let allowedOrigins = ['http://localhost:3000'];

if(process.env.CORS_OPTIONS1 && process.env.CORS_OPTIONS2)
  allowedOrigins = [process.env.CORS_OPTIONS1, process.env.CORS_OPTIONS2];

const options: cors.CorsOptions = {
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}; 

const metricsMiddleware:RequestHandler = promBundle({includeMethod: true});
app.use(metricsMiddleware);

app.use(cors(options));
app.use(bp.json());

app.use(apiUsuarios);
app.use(apiPedidos);
app.use(apiProductos);

app.listen(port, ():void => {
    console.log('Restapi listening on '+ port);
}).on("error",(error:Error)=>{
    console.error('Error occured: ' + error.message);
});

mongoose.connect(conexiondb) 
.then(() => console.log("BD conectada"))

