import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        lowercase: true,
    },
    origen: String,
    precio: {
        type: Number,
        required: true,
        min: 0,
    },
    descripcion: String
})

module.exports = mongoose.model("Productos", productoSchema)