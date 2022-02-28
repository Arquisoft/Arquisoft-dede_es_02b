import mongoose from "mongoose";

interface Producto{
    
}

const pedidoSchema = new mongoose.Schema({
    "Numero de pedido": Number,
    email: String,
    "lista de productos": [{
        id_producto: mongoose.Types.ObjectId,
        cantidad: Number,
        precio: Number
    }],
    "precio total": Number,
    direccion: String,
    fecha: Date
})

module.exports = mongoose.model("Pedidos", pedidoSchema)