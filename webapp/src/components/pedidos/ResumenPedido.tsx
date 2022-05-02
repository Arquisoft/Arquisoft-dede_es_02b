import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Estado, FormPagos, Pedido, Product } from '../../shared/shareddtypes';
import { useCallback, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { addPedido, findUserByEmail, getNextNumberPedido } from '../../api/api';

const TAX_RATE = 0.04;

let cantidad: number = 0;
export default function ResumenPedido(formValues:FormPagos) {
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

    const [carrito, ] = useState<{id_producto:string,  cantidad: number, precio: number}[]>(generarCarrito());
    const [generado, setGenerado] = useState(false);
    function generarCarrito(): {id_producto:string, precio: number, cantidad: number}[]{
        let carrito : {id_producto:string, precio: number, cantidad: number}[]= [];
        
        for(let i: number = 0; i < sessionStorage.length-1; i++){
          let key: string = sessionStorage.key(i)!;
    
          let id_producto = JSON.parse(sessionStorage.getItem(key)!).id;
          let precio = JSON.parse(sessionStorage.getItem(key)!).precio;
          let qty = Number.parseInt(JSON.parse(sessionStorage.getItem(key)!).qty);
    
          carrito.push({id_producto: id_producto, precio:(precio*qty), cantidad:qty});
        }
        
        return carrito;
      }
      const generarPedido = useCallback(async function (values: FormPagos){
        let numero_pedido: number = await getNextNumberPedido();
        let id_usuario: string = (await findUserByEmail(JSON.parse(sessionStorage.getItem("usuario")!).email))._id;
        let precio_total:number = 0; 
    
        carrito.forEach(element => {
          precio_total+= element.precio;
        });
    
        let pedido: Pedido = {
          _id: '',
          numero_pedido: numero_pedido,
          id_usuario: id_usuario,
          precio_total: precio_total,
          estado: Estado.pendiente,
          fecha: '',
          lista_productos: carrito,
          direccion: {
            calle: values.calle,
            localidad: values.localidad,
            provincia: values.provincia,
            pais: values.pais,
            codigo_postal: Number.parseInt(values.codigo_postal) 
          },
          tarjeta: {
            numero_tarjeta: Number.parseInt(values.numTarjeta),
            fecha_caducidad: values.fechaTarjeta,
            numero_seguridad: Number.parseInt(values.numSeguridadTarjeta),
          }
        };
    
        let gen = await addPedido(pedido);
        if(gen){
          setGenerado(gen);
    
          let usuario = sessionStorage.getItem("usuario")!;
          sessionStorage.clear();
          sessionStorage.setItem("usuario",usuario);
          sessionStorage.setItem("pedido_generado", numero_pedido.toString());
        }
      }, [carrito])

    return (
        <Box sx={{ flexGrow: 1, padding: 3, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'space-between'}}>
            <Typography variant="h1" component="h2" sx={{ fontSize: 40, marginBottom:3 }}>
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
            <Button sx={{display:'flex', marginTop:3}} variant='contained' onClick={()=>generarPedido(formValues)}>Finalizar</Button>
            </Box>
    );
}
