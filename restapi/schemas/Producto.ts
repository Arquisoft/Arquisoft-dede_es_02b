import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    origen:{
        type: String,
        required: true,
    },
    precio: {
        type: Number,
        required: true,
        min: 0,
    },
    descripcion: {
        type: String,
        required: true,
    }, 
    foto: {
        type: String,
        required: true,
    },
})

export default mongoose.model("Productos", productoSchema)