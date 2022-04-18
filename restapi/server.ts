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
const port: string = process.env.PORT||'5000';
const conexiondb: string = process.env.MONGO_URI!;

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

