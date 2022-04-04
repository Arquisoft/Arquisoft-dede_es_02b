import React from 'react';
import {Product} from '../../shared/shareddtypes';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ProductComponent from './ProductItem';


type ProductProps = {
  products: Product[];
}

const Products:React.FC<ProductProps>=(props: ProductProps)=> {
  if(props!==null){
    return (
      <Box sx={{ flexGrow: 1, padding: 3 }}>
        <Grid container spacing={3} direction="row" justifyContent="center" alignItems="center">
          {Array.from(Array(props.products.length)).map((_, index) => (
            <Grid item key={index}>
              <ProductComponent product={props.products[index]}/>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }
  else
    return(<></>);
}

export default Products;
