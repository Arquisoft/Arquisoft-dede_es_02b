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
import  {login} from '../../api/api';
import { Navigate, Link } from "react-router-dom";

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      <LinkMui color="inherit" href="https://github.com/Arquisoft/dede_es2b">
        Código fuente 
      </LinkMui>
    </Typography>
  );
}

const theme = createTheme();

const Login:React.FC=()=> {
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [logueado, setLogueado] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if(!await login({email, contraseña}))
      setLogueado(email);
    
    if(!logueado)
      setErrorMessage('Email o contraseña incorrectos');
    else
      setErrorMessage('');
  };

  const emailLogueado = logueado || sessionStorage.getItem("usuario");

  if (emailLogueado){
    return <Navigate to="/products" />;
  }

  return (
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Inicia sesión
          </Typography>
          <Box component="form" name='login' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="contraseña"
              label="Contraseña"
              type="password"
              id="contraseña"
              autoComplete="current-contraseña"
              onChange={(e) => setContraseña(e.target.value)}
            />
            {errorMessage && (
              <p style={{color: 'red'}} className="error"> {errorMessage} </p>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Iniciar sesión
            </Button>
            <Grid container>
              <Grid item>
                <Link to={"/register"}>
                  <Typography key="registro" sx={{ my: 1, color: 'blue', textAlign:"center", display: 'block' }}>
                    Registrarse
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default Login;