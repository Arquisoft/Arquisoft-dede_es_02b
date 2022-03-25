export default {
    rootDir: './../',
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    collectCoverage: true,
    collectCoverageFrom:[
        "usuarios/apiUsuarios.ts",
        "productos/apiProductos.ts",  
        "pedidos/apiPedidos.ts"
    ]
}