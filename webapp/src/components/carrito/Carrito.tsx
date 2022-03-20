import * as React from 'react';
import  {getProducts} from '../../api/api';
import {Product} from '../../shared/shareddtypes';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ProductComponent from './CarritoItem';
import { Button, Typography } from '@mui/material';
import accounting from 'accounting';


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
  console.log(sessionStorage[i]);
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

  return (
    <Box sx={{ flexGrow: 1, padding: 3}}>
      <Grid container spacing={3}>
        {Array.from(Array(productos.length)).map((_, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <ProductComponent product={productos[index]} cantidadItem={carrito.get(productos[index])as number}/>
          </Grid>
        ))}
      </Grid>
    </Box>
  ); 
}

export default Carrito;