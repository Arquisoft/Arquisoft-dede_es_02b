import { Typography } from '@mui/material';
import React from 'react';
import logo from '../error.png'
import "./error.css";

const Error403: React.FC = () => {

  return (
    <div className='body'>
      <div className='error'>
        <Typography className='error' variant='h1' sx={{ fontSize: '4em', marginRight: '20px' }}>Error 403 - Prohibido</Typography>
        <Typography sx={{ fontSize: '1.5em' }}> No tienes permiso para acceder a esta página</Typography>
      </div>
      <div className='imagenE' aria-label='imagen'><img className='imagenError' src={logo} alt=""></img></div>
    </div>
  );

}

export default Error403;