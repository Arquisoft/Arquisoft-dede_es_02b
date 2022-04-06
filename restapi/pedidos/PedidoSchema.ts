import mongoose from "mongoose";

const pedidoSchema = new mongoose.Schema({
    numero_pedido: {
        type: Number,
        required: true,
        immutable: true,
        unique: true,
        min: 0,
    },
    id_usuario: { 
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Usuario",
    },
    lista_productos: {
        type:[{
            id_producto:{
                type: mongoose.Types.ObjectId,
                required: true,
                ref: "Producto",
                _id:true,
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
            _id:false,
        }],
    },
    precio_total: {
        type: Number,
        required: true,
        min: 0,
    },
    direccion: {
        calle: {
            type: String,
            required: true,
            lowercase: true,
        },
        localidad: {
            type:String,
            required: true,
            lowercase: true,
        },
        provincia: {
            type:String,
            required: true,
            lowercase: true,
        },
        pais: {
            type:String,
            required: true,
            lowercase: true,
        },
        codigo_postal: {
            type: Number,
            required: true,
            min: 0,
        },
    },
    fecha: {
        type: Date,
        immutable: true,
        default: () => Date.now(),
    },
    estado: {
        type: String,
        required: true,
        enum: ["Entregado", "En reparto", "Pendiente", "Listo para repartir", "Cancelado"],
    }
})

export default mongoose.model("Pedidos", pedidoSchema)