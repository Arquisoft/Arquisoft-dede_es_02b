export type User = {
    name:string;
    email:string;
    password:string;
    dni:string;
}

export type LoginData = {
    email: string;
    password: string;
}

export type Product = {
    nombre:string;
    origen:string;
    precio:number;
    descripcion:string;
    foto:string;
}