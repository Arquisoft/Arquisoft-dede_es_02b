export type User = {
    _id:string;
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
    numero_pedido:number;
    id_usuario:string;
    precio_total:number;
    lista_productos:[{
        id_producto:string,
        cantidad:number,
        precio:number,
    }];
    direccion:{
        calle:string,
        localidad:string,
        provincia:string,
        pais:string,
        codigo_postal:number,
    };
}