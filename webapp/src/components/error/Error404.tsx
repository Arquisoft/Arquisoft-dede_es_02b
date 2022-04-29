import { Typography } from '@mui/material';
import React from 'react';
import logo from '../error.png'
import "./error.css";

const Error404: React.FC = () => {

  return (
    <div className='body'>
      <div className='error'>
        <Typography className='error' variant='h1' sx={{ fontSize: '4em', marginRight: '20px' }}>Error 404 - Pagina inexistente</Typography>
        <Typography sx={{ fontSize: '1.5em' }}>Lo sentimos, pero esta página no está disponible</Typography>
      </div>
      <div className='imagenE' aria-label='imagen'><img className='imagenError' src={logo} alt=""></img></div>
    </div>
  );

}

export default Error404;