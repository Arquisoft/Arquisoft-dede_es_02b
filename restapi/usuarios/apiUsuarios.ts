import express, { Request, Response, Router } from 'express';
import bcrypt from 'bcrypt';
import Usuario from './UsuarioSchema';

const api: Router = express.Router()

api.get(
  "/users/list",
  async (req: Request, res: Response): Promise<Response> => {
    let users = await Usuario.find().select("nombre").select("dni").select("email")
    return res.status(200).send(users);
  }
);

api.post(
  "/users/login",
  async (req: Request, res: Response): Promise<void> => {
    let correo = req.body.email.toLowerCase();
    if (await Usuario.exists({ email: correo })) {
      let user = await Usuario.findOne().where("email").equals(correo.toLowerCase());
      console.log(user);
      try {
        if (await bcrypt.compare(req.body.contraseña, user.contraseña)) {
          res.json(correo);
          // res.status(200).send(correo);
        } else {
          res.status(412).send("Contraseña erronea");
        }
      } catch {
        res.sendStatus(500);
      }

    } else {
      res.status(412).send("Usuario no encontrado");
    }
  }
);

api.post(
  "/users/add",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      let usuario = new Usuario();
      usuario.nombre = req.body.nombre;
      usuario.email = req.body.email;
      usuario.dni = req.body.dni;

      const hashedPass = await bcrypt.hash(req.body.contraseña, 10);
      usuario.contraseña = hashedPass;

      await usuario.save();
      return res.sendStatus(200);
    } catch {
      return res.sendStatus(500);
    }
  }
);

api.get(
  "/users/email=:email",
  async (req: Request, res: Response): Promise<Response> => {
    let usuario = await Usuario.findOne().where("email").equals(req.params.email.toLowerCase())
    return res.status(200).send(usuario);
  }
);

api.get(
  "/users/dni=:dni",
  async (req: Request, res: Response): Promise<Response> => {
    let usuario = await Usuario.findOne().where("dni").equals(req.params.dni.toLowerCase())
    return res.status(200).send(usuario);
  }
);

export default api;