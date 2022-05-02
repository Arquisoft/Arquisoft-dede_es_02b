import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Product } from '../../shared/shareddtypes';
import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const TAX_RATE = 0.04;

let cantidad: number = 0;
export default function ResumenPedido() {
    let productos: Product[] = [];
    let a = new Map<Product, number>();
    for (let index = 0; index < sessionStorage.length; index++) {
        const element = sessionStorage.key(index);
        if (element !== null && element !== "usuario") {
            var cartItem = sessionStorage.getItem(element);
            if (cartItem !== null) {
                var cartItem2 = JSON.parse(cartItem);
                cantidad = cartItem2.qty;
                var obj: Product = { _id: element, nombre: cartItem2.nombre, descripcion: cartItem2.descripcion, foto: cartItem2.foto, origen: cartItem2.origen, precio: cartItem2.precio };
                productos.push(obj);
                a.set(obj, cantidad);
            }
        }
    }
    let sum = 0;
    function subtotal() {
        Array.from(Array(productos.length)).map((_, index) => (
            sum += ((a.get(productos[index]) as number) * (productos[index].precio))
        ));
        return sum;
    }

    return (
        <Box sx={{ flexGrow: 1, padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h1" component="h2" sx={{ fontSize: 40, marginBottom: 3 }}>
                Resumen total del pedido
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Productos</TableCell>
                            <TableCell align="right">Cantidad</TableCell>
                            <TableCell align="right">Precio/u</TableCell>
                            <TableCell align="right">Precio</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productos.map((producto) => (
                            <TableRow key={producto.nombre}>
                                <TableCell>{producto.nombre}</TableCell>
                                <TableCell align="right">{a.get(producto) as number}</TableCell>
                                <TableCell align="right">{producto.precio}</TableCell>
                                <TableCell align="right">{(a.get(producto) as number) * producto.precio}</TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell rowSpan={4} />
                            <TableCell colSpan={2}>Subtotal</TableCell>
                            <TableCell align="right">{subtotal()}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Gasto de envio</TableCell>
                            <TableCell align="right">{2}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>IVA</TableCell>
                            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
                            <TableCell align="right">{(sum * TAX_RATE).toFixed(2)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Total (€)</TableCell>
                            <TableCell align="right">{(2 + sum + sum * TAX_RATE).toFixed(2)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Link to="metodoPago">
            <Button sx={{display:'flex', marginTop:3}} variant='contained'>Finalizar</Button>
            </Link>
            </Box>
    );
}
