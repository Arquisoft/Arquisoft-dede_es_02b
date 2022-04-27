import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import "./Home.css";
import logo from "./logo.png"
import { Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { Product } from '../shared/shareddtypes';
import ProductHome from './ProductHome';
import { Animator, batch, Fade, Move, MoveOut, ScrollContainer, ScrollPage, Sticky } from 'react-scroll-motion';
import { useEffect, useState } from 'react';
import { getProducts } from '../api/api';

const Home: React.FC = () => {
    const [products,setProducts] = useState<Product[]>([]);
  
    const refreshProductList = async () => {
      setProducts(await getProducts());
    }
  
    useEffect(()=>{
      refreshProductList();
    },[]);

    var productosLenght=products.length
    if(products.length>2){
        productosLenght=2;
    }
    return (
        <>
        <ScrollContainer>
            <ScrollPage page={0}>
                <Animator animation={batch(Fade(), MoveOut(0, -1000))}>
                    
                    <div className='container'>
                        <Box className='Home'>
                            <Typography className='Titulo' variant='h1' sx={{ fontSize: '4em', marginRight: '20px' }}>Bienvenido a DeDe</Typography>
                            <Typography className='Descripcion' sx={{ fontSize: '1.5em' }}>La tienda Nº1 en la venta de frutas</Typography>
                            <Link to="/login">
                                <Button variant='contained'>Entrar</Button>
                            </Link>
                        </Box>
                        <Box className='imagen'>
                            <img src={logo} alt=""></img>
                        </Box>
                    </div>
                    <div className='firstPage'>
                    <div className='arrow'></div>
                    </div>
                    
                </Animator>
            </ScrollPage>
            <ScrollPage page={1}>
                <Animator animation={batch(Fade(), MoveOut(0,-1000))}>
                    <div className='quienesSomos'>
                        <Typography variant='h1' sx={{ fontSize: '4em' }}>¿Quienes somos?</Typography>
                        <Typography sx={{ fontSize: '1.5em', maxWidth: 1000 }}>Somos el grupo DeDe_es2b, que tiene como objetivo la venta de frutas de forma segura y rápida, además de respetar la privacidad de los clientes.</Typography>
                    </div>
                </Animator>
            </ScrollPage>
            <ScrollPage page={2}>
                <Animator animation={batch(Fade(), Move(), Sticky())}>
                    <div className='quienesSomos'>
                        <Typography variant='h1' sx={{ fontSize: '4em' }}>Productos destacados</Typography>
                        <Grid container spacing={3} direction="row" justifyContent="center" alignItems="center" marginTop={1}>
                            {Array.from(Array(productosLenght)).map((_, index) => (
                                <Grid item key={index}>
                                    <ProductHome product={products[index]} />
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                </Animator>
            </ScrollPage>
        </ScrollContainer>
        <footer className='footer'>
        <Typography>@DeDe_es2b</Typography>
        </footer>
        </>
    );
}


export default Home;