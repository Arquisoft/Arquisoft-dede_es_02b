import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
    nombre: String,
    origen: String,
    precio: Number,
    descripcion: String
})

module.exports = mongoose.model("Productos", productoSchema)