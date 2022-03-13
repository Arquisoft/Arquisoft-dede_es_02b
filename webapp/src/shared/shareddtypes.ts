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
    id: string;
    nombre:string;
    origen:string;
    precio:number;
    descripcion:string;
    foto:string;
}