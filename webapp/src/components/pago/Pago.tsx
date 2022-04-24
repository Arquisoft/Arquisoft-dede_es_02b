import * as React from 'react';
import { useState } from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Navigate } from 'react-router-dom';
import { color } from '@mui/system';

const theme = createTheme();

function Pago(): JSX.Element {
  const [direccion, setDireccion] = useState("");
  const [tarjeta, setTarjeta] = useState("");
  const [errorMessage, setErrorMessage] = useState('');

  const tarjetaRegex = /([0-9]{4}){1}( [0-9]{4}){3}/

  if (sessionStorage.length==1){
    return <Navigate to="/carrito" />;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if(!tarjeta.match(tarjetaRegex))
      setErrorMessage('La tarjeta es incorrecta');
  };

  function SubmitButton(){
    if (direccion && tarjeta){
      return <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Pagar</Button>
    } else {
      return <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled>Pagar</Button>
    };
  };

  function handlePOD(){
    
  }

  return(
    <>
      <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Pagar
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Grid container>
            <Grid item>
              <TextField
                margin="normal"
                required
                fullWidth
                id="direccion"
                label="Dirección"
                name="direccion"
                autoComplete="direccion"
                autoFocus
                onChange={(e) => setDireccion(e.target.value)}
              />
            </Grid>
              <Grid item alignItems="stretch" style={{ display: "flex" }}>
                <Button onClick={handlePOD} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Obtener de POD</Button>
              </Grid>
            </Grid>
            <TextField
              margin="normal"
              required
              fullWidth
              name="numeroTarjeta"
              label="Número de Tarjeta"
              type="numeroTarjeta"
              id="numeroTarjeta"
              autoComplete="numeroTarjeta"
              onChange={(e) => setTarjeta(e.target.value)}
            />
            {errorMessage && (
              <p style={{color: 'red'}} className="error"> {errorMessage} </p>
            )}
            <SubmitButton/>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
   </>
  );
}

export default Pago;