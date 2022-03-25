export type User = {
    nombre:string;
    email:string;
    contraseña:string;
    dni:string;
}

export type LoginData = {
    email: string;
    contraseña: string;
}

export type Product = {
    _id:string;
    nombre:string;
    origen:string;
    precio:number;
    descripcion:string;
    foto:string;
}

export type Pedido = {
    _id:string;
    nPedido: string; 
    fecha: string; 
    totalPedido: string;  
    estado: string;  
    cliente: string;  
    direccion: string; 
}