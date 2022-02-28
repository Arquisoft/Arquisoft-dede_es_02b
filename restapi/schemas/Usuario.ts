import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    name: String,
    dni:String,
    email:String,
    contraseña:String
})

module.exports = mongoose.model("Usuarios", usuarioSchema)