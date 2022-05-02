export type User = {
    _id:string;
    nombre:string;
    apellidos:string;
    idSolid:string;
    email:string;
    contraseña:string;
    dni:string;
    esAdmin:boolean;
}

export type LoginData = {
    email: string;
    contraseña: string;
}

export type Product = {
    _id: string;
    nombre: string;
    origen: string;
    precio: number;
    descripcion: string;
    foto: string;
}

export type Pedido = {
    _id: string;
    numero_pedido: number;
    id_usuario: string;
    precio_total: number;
    estado: Estado;
    fecha: string;
    lista_productos: [{
        id_producto: string,
        cantidad: number,
        precio: number,
    }];
    direccion: {
        calle: string,
        localidad: string,
        provincia: string,
        pais: string,
        codigo_postal: number,
    };
}

export enum Estado {
    entregado = "Entregado",
    reparto = "En reparto",
    pendiente = "Pendiente",
    listo = "Listo para repartir",
    cancelado = "Cancelado"
}

export type FormPagos = {
    calle: string,
    localidad: string,
    provincia: string,
    pais: string,
    codigo_postal: string,
    numTarjeta: string,
    fechaTarjeta: string,
    numSeguridadTarjeta: string
}

export interface SolidDireccion {
    calle: string,
    localidad: string,
    provincia: string,
    pais: string,
    codigo_postal: string
}