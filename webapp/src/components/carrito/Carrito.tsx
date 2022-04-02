import * as React from 'react';
import {Product} from '../../shared/shareddtypes';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ProductComponent from './CarritoItem';
import Split from 'react-split';
import { Typography } from '@mui/material';
import Total from './Total';

type ProductProps = {
  products: Product[];
}

let carrito = new Map<Product, number>();

let cantidad:number = 0;

export function getPrecio():number{
  let precio = 0;
  carrito.forEach((value: number, key: Product) => {
    precio += key.precio * value;
  });
  return precio;
}

const Carrito: React.FC<ProductProps>= (props: ProductProps) =>{
  var i = 0;
  let productos: Product[]=[];
  carrito.clear();
  for(i; i<props.products.length; i++){
    var cartItem = sessionStorage.getItem(props.products[i]._id);
    if (cartItem != null){
      var cartItem2 = JSON.parse(cartItem);
      cantidad = cartItem2.qty;
      var obj: Product = { _id: cartItem2._id, nombre:cartItem2.nombre, descripcion:cartItem2.descripcion, foto:cartItem2.foto, origen:cartItem2.origen, precio:cartItem2.precio};
      productos.push(obj);
      carrito.set(obj, cantidad);
    }
  }

  function ListaResumen(props: any){
    const items = props.items;
    let lista: any;
    items.forEach((value: number, key: Product) => {
      lista += <li>key.nombre</li>
    });
    return (
      <ul>{lista}</ul>
    );
  }

  return (
    <Split
      sizes={[75, 25]}
      direction="horizontal"
      cursor="col-resize"
      className="split-flex"
      minSize={[1000, 500]}
    >
      <Box sx={{ flexGrow: 1, padding: 3}}>
          <Grid container spacing={3}>
            {Array.from(Array(productos.length)).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <ProductComponent product={productos[index]} cantidadItem={carrito.get(productos[index])as number}/>
              </Grid>
            ))}
          </Grid>
      </Box>
      <Box sx={{ flexGrow: 1, padding: 3}}>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            Resumen del pedido:
          </Typography>
          {Array.from(Array(productos.length)).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <li>{productos[index].nombre +" ("+ carrito.get(productos[index]) + " uds)" +
                    "  -------  "+productos[index].precio*(carrito.get(productos[index])as number)+"€"}</li>
            </Grid>
          ))}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ----------------------------
          </Typography>
          <Total></Total>
      </Box>
    </Split>
  ); 
}

export default Carrito;