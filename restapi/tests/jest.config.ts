export default {
    rootDir: './../',
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    collectCoverage: true,
    collectCoverageFrom:[
        "usuarios/apiUsuarios.ts",
        "usuarios/UsuarioSchema.ts",
        "productos/apiProductos.ts", 
        "productos/ProductoSchema.ts", 
        "pedidos/apiPedidos.ts", 
        "pedidos/PedidoSchema.ts"
    ]
}