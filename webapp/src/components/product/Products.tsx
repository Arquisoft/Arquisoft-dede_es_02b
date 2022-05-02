import React, { useEffect } from 'react';
import { Product } from '../../shared/shareddtypes';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ProductComponent from './ProductItem';
import { Button, Typography } from '@mui/material';
import { ShoppingBasket } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { getProducts } from '../../api/api';
import Error403 from '../error/Error403';

let productoTest:Product[]=[];
export function productosTest(producto:Product){
  productoTest[0]=producto;
}

const Products: React.FC = () => {
  const [productos, setProductos] = React.useState<Product[]>(productoTest);

  function botonAñadir(): JSX.Element | undefined {
    
      if (JSON.parse(sessionStorage.getItem("usuario")!).esAdmin)
        return (<Link to="/addProducts">
          <Button variant='contained'>Añadir producto</Button>
        </Link>)
  }

  const refreshProductList = async () => {
    setProductos(await getProducts());
  }

  useEffect(() => {
    refreshProductList();
  }, []);

  if(!sessionStorage.getItem("usuario"))
    return <Error403></Error403>

  return (
      <Box sx={{ flexGrow: 1, padding: 3 }}>
        <Typography data-testid="txt-productos" variant="h1" component="h2" sx={{ fontSize: 40 }}>
          Productos <ShoppingBasket />
        </Typography>
        {botonAñadir()}
        <Grid container spacing={3} direction="row" justifyContent="center" alignItems="center" marginTop={1}>
          {Array.from(Array(productos.length)).map((_, index) => (
            <Grid item key={index}>
              <ProductComponent product={productos[index]} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
}

export default Products;
