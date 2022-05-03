import React, { useCallback, useEffect, useState } from 'react';
import { Product } from '../../shared/shareddtypes';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ProductComponent from './ProductItem';
import { Button, TextField, Typography } from '@mui/material';
import { ShoppingBasket } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { getProducts, isAdmin } from '../../api/api';
import Error403 from '../error/Error403';

let productoTest: Product[] = [];
export function productosTest(producto: Product) {
  productoTest[0] = producto;
}

let isAdminTest: boolean = false;

export function setTestAdminProductos(admin: boolean) {
  isAdminTest = admin;
}

const Products: React.FC = () => {
  const [productos, setProductos] = useState<Product[]>(productoTest);
  const [esAdmin, setEsAdmin] = useState(isAdminTest);
  const [palabra, setPalabra] = useState<string>("");

  function botonAñadir(): JSX.Element | undefined {

    if (esAdmin)
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

  const actualizarEsAdmin = useCallback(async () => {
    setEsAdmin(await isAdmin(JSON.parse(sessionStorage.getItem("usuario")!).email))
  }, []);

  useEffect(() => {
    actualizarEsAdmin()
  }, [esAdmin, actualizarEsAdmin])

  if (!sessionStorage.getItem("usuario"))
    return <Error403></Error403>

  function filtrarNombre(nombre: string) {
    setPalabra(nombre);
  }

  function getProductos(producto:string, index:number){
    if(producto.includes(palabra))
    return(<Grid item key={index}>
      <ProductComponent product={productos[index]} />
    </Grid>);
  }

  return (
      <Box sx={{ flexGrow: 1, padding: 3 }}>
        <Typography data-testid="txt-productos" variant="h1" component="h2" sx={{ fontSize: 40 }}>
          Productos<ShoppingBasket />
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
