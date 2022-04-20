import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import "./Home.css";
import logo from "./logo.png"
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <div className='body'>
            <div className='container'>
                <Box className='Home'>
                    <Typography className='Titulo' variant='h1' sx={{ fontSize: '4em', marginRight:'20px' }}>Bienvenido a DeDe</Typography>
                    <Typography className='Descripcion' sx={{ fontSize: '1.5em' }}>La tienda Nº1 en la venta de frutas</Typography>
                    <Link to="/login">
                    <Button variant='contained'>Entrar</Button>
                    </Link>
                </Box>
                <Box className='imagen'>
                    <img src={logo} alt=""></img>
                </Box>
            </div>
        </div>
    );
}


export default Home;