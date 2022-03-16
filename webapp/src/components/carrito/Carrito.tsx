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

let carrito:Product[]=[];

 export function getPrecio():number{
  let precio = 0;
  for (let index = 0; index < carrito.length; index++) {
    const element = carrito[index];
    precio+=carrito[index].precio;
    
  }
  return precio;
}

const Carrito: React.FC<ProductProps>= (props: ProductProps) =>{
  carrito=props.products;
  return (
    <Box sx={{ flexGrow: 1, padding: 3}}>
      <Grid container spacing={3}>
        {Array.from(Array(props.products.length)).map((_, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <ProductComponent product={props.products[index]}/>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Carrito;