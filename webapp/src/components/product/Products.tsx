import React from 'react';
import { Product } from '../../shared/shareddtypes';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ProductComponent from './ProductItem';
import { Typography } from '@mui/material';
import { ShoppingBasket } from '@mui/icons-material';


type ProductProps = {
  products: Product[];
}

const Products: React.FC<ProductProps> = (props: ProductProps) => {
  if (props !== null) {
    return (
      <Box sx={{ flexGrow: 1, padding: 3 }}>
        <Typography variant="h1" component="h2" sx={{fontSize:40}}>
          Productos <ShoppingBasket/>
        </Typography>
        <Grid container spacing={3} direction="row" justifyContent="center" alignItems="center" marginTop={1}>
          {Array.from(Array(props.products.length)).map((_, index) => (
            <Grid item key={index}>
              <ProductComponent product={props.products[index]} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }
  else
    return (<></>);
}

export default Products;
