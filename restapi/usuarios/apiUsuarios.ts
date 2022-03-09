import express, { Request, Response, Router } from 'express';
import bcrypt from 'bcrypt';
import Usuario from './UsuarioSchema';

const api:Router = express.Router()

api.get(
    "/users/list",
    async (req: Request, res: Response): Promise<Response> => {
        let users = await Usuario.find().select("nombre").select("dni").select("email") 
        return res.status(200).send(users);
    }
  );
  
  api.post(
    "/users/login",
    async (req: Request, res: Response): Promise<Response> =>{
      let correo = req.body.email.toLowerCase();
      if(await Usuario.exists({ email: correo})){
        let user = await Usuario.findOne().where("email").equals(correo.toLowerCase());
      
        try{
          if(await bcrypt.compare(req.body.contraseña, user.contraseña)){
            return res.status(200).send("Success");
          }else{
            return res.status(400).send("Contraseña erronea");
          }
        }catch{
          return res.sendStatus(500);
        }
  
      }else{
        return res.status(400).send("Usuario no encontrado");
      }
    }
  );
  
  api.post( 
    "/users/add",
    async (req: Request, res: Response): Promise<Response> => {
      try{
        let usuario = new Usuario();
        usuario.nombre = req.body.nombre;
        usuario.email = req.body.email;
        usuario.dni = req.body.dni;
        
        const hashedPass = await bcrypt.hash(req.body.contraseña, 10);
        usuario.contraseña = hashedPass;
  
        await usuario.save();
        return res.sendStatus(200); 
      }catch{
        return res.sendStatus(500)
      }
    }
  );

export default api;