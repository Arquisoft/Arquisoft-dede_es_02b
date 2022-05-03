import * as React from 'react';
import { useState } from "react";
import { Typography, Button } from '@mui/material';
import { Navigate } from "react-router-dom";
import logo from '../logo.png'
import "../error/error.css";

const PedidoCompletado: React.FC = () => {
  const [volver, setVolver] = useState(false);

  if(volver){
    return <Navigate to="/products" />;
    setVolver(false);
  }

  function handleButton(){
    setVolver(true);
  }

  return (
    <div className='body'>
      <div className='error'>
        <Typography className='error' variant='h1' sx={{ fontSize: '4em', marginRight: '20px' }}>Pedido realizado con éxito</Typography>
        <Typography sx={{ fontSize: '1.5em' }}>¡Gracias por comprar en DeDe!</Typography>
        <Button onClick={handleButton} variant="contained" sx={{ mt: 3, mb: 2 }}>Volver a la tienda</Button>
      </div>
      <div className='imagenE' aria-label='imagen'><img className='imagenError' src={logo} alt=""></img></div>
    </div>
  );

}

export default PedidoCompletado;