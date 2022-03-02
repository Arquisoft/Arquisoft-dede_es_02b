import mongoose from "mongoose";

const pedidoSchema = new mongoose.Schema({
    "Numero de pedido": {
        type: Number,
        required: true,
        immutable: true,
        unique: true,
    },
    id_usuario: { //Mejor id de usuario?
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Usuario",
    },
    "lista de productos": [{
        id_producto:{
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "Producto",
        } ,
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