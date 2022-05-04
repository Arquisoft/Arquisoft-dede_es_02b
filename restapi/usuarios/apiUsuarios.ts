import express, { Request, Response, Router } from 'express';
import bcrypt from 'bcrypt';
import Usuario from './UsuarioSchema';

const apiUsuarios: Router = express.Router()

apiUsuarios.get(
  "/users/list",
  async (_req: Request, res: Response): Promise<Response> => {
    let users = await Usuario.find();
    return res.status(200).send(users);
  }
);

apiUsuarios.post(
  "/users/login",
  async (req: Request, res: Response): Promise<void> => {
    try {
      let correo = req.body.email.toLowerCase();
      let user = await Usuario.findOne().where("email").equals(correo.toLowerCase());
      
      if (user) {
        if (await bcrypt.compare(req.body.contraseña, user.contraseña)) {
          res.json(user);
        } else {
          res.status(412).send("Contraseña o usuario erroneo");
        }
      } else {
        res.status(412).send("Contraseña o usuario erroneo");
      }
    } catch {
      res.sendStatus(500);
    }
  });

apiUsuarios.post(
  "/users/add",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      let usuario = new Usuario();
      usuario.nombre = req.body.nombre;
      usuario.apellidos = req.body.apellidos;
      usuario.email = req.body.email;
      usuario.dni = req.body.dni;

      if(!req.body.contraseña){
        return res.sendStatus(500);
      }

      if(req.body._id){
        usuario._id = req.body._id;
      }

      if(req.body.idSolid){
        usuario.idSolid = req.body.idSolid;
      }else{
        usuario.idSolid = "";
      }

      if(req.body.esAdmin !== undefined)
        usuario.esAdmin = req.body.esAdmin;

      if(req.body.foto)
        usuario.foto = req.body.foto;

      const hashedPass = await bcrypt.hash(req.body.contraseña, 10);
      usuario.contraseña = hashedPass;

      await usuario.save();
      return res.status(200).send((usuario));
    } catch (error){
      return res.sendStatus(500);
    }
  }
);

apiUsuarios.get(
  "/users/email=:email",
  async (req: Request, res: Response): Promise<Response> => {
    let usuario = await Usuario.findOne({email: req.params.email.toLowerCase()}).exec();
    if(usuario !== null){
      return res.status(200).send(usuario)
    }
    return res.status(200).send("{}");
  }
);

apiUsuarios.get(
  "/users/dni=:dni",
  async (req: Request, res: Response): Promise<Response> => {
    let usuario = await Usuario.findOne({dni: req.params.dni.toLowerCase()}).exec();
    if(usuario !== null){
      return res.status(200).send(usuario)
    }
    return res.status(200).send("{}");
  }
);

apiUsuarios.get(
  "/users/id=:id",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      let usuario = await Usuario.findById(req.params.id)
      if(usuario !== null){
        return res.status(200).send(usuario)
      }
      return res.status(200).send("{}");
    } catch (error) {
      return res.sendStatus(500); 
    }
  }
);

apiUsuarios.post(
  "/users/delete",
  async (req: Request, res: Response): Promise<Response> => {
    Usuario.findById(req.body._id).deleteOne().exec();
    return res.sendStatus(200);
  }
);

apiUsuarios.post(
  "/users/editar",
  async (req: Request, res: Response): Promise<Response> => {
    
    try {
      let query = { email: req.body.email.toString() };
      let usuario = await Usuario.findOne(query).exec();

      if(req.body.nombre)
        usuario.nombre = req.body.nombre;

      if(req.body.apellidos)
        usuario.apellidos = req.body.apellidos;

      if(req.body.idSolid)
        usuario.idSolid = req.body.idSolid;

      if(req.body.foto)
        usuario.foto = req.body.foto;
        
      await usuario.save();
      return res.status(200).send((usuario));
    } catch {
      return res.sendStatus(500);
    }
  }
);
 
export default apiUsuarios;