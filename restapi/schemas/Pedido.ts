import mongoose from "mongoose";
import { validateEmail } from "./validators";

const pedidoSchema = new mongoose.Schema({
    "Numero de pedido": {
        type: Number,
        required: true,
        immutable: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        validate: {
            validator: (v: String) => validateEmail(v),
            message: (props: { value: any; }) => `${props.value} no es un email válido`,
        }
    },
    "lista de productos": [{
        id_producto: mongoose.Types.ObjectId,
        cantidad: {
            type: Number,
            required: true,
            min: 0,
        },
        precio:  {
            type: Number,
            required: true,
            min: 0,
        },
    }],
    "precio total": {
        type: Number,
        required: true,
        min: 0,
    },
    direccion: {
        type: String,
        required: true,
        lowercase: true,
    },
    fecha: {
        type: Date,
        immutable: true,
        default: () => Date.now(),
    }
})

export default mongoose.model("Pedidos", pedidoSchema)