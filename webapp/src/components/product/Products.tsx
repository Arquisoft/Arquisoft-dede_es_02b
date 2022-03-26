import React from 'react';
import {Product} from '../../shared/shareddtypes';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ProductComponent from './ProductItem';


type ProductProps = {
  products: Product[];
}

const Products:React.FC<ProductProps>=(props: ProductProps)=> {
  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
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

export default Products;
