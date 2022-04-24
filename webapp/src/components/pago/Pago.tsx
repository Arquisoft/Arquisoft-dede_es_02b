import * as React from 'react';
import { useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import LinkMui from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Navigate } from 'react-router-dom';

const theme = createTheme();

function Pago(): JSX.Element {
    const [direccion, setDireccion] = useState("");

    if (sessionStorage.length==1){
      return <Navigate to="/carrito" />;
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

    };

    function SubmitButton(){
      if (direccion){
        return <Button variant="contained" type="button">Pagar</Button>
      } else {
        return <Button variant="contained" type="button" disabled>Pagar</Button>
      };
    };

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
            Pago
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="dirección"
              label="Dirección"
              name="dirección"
              autoComplete="dirección"
              autoFocus
              onChange={(e) => setDireccion(e.target.value)}
            />
            <SubmitButton/>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
   </>
  );
}

export default Pago;