import mongoose from "mongoose";
import { validateEmail } from "../schemas/Validators";

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        lowercase: true,
    },
    dni: {
        type: String,
        required: true,
        lowercase: true,
        minlength: 9,
        maxlength: 9,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        immutable: true,
        validate: {
            validator: (v: string) => validateEmail(v),
            message: (props: { value: any; }) => `${props.value} no es un email válido`,
        }
    },
    contraseña: {
        type: String,
        required: true,
    }
})

export default mongoose.model("Usuarios", usuarioSchema) 