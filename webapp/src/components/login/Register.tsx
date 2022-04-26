import * as React from 'react';
import { useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Navigate, Link } from "react-router-dom";
import { addUser, findUserByEmail, findUserByDni } from '../../api/api';
import { User } from '../../shared/shareddtypes';

const theme = createTheme();

export default function Register() {

  const [logueado, setLogueado] = useState("");
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const user: User = {
      _id:"",
      nombre: data.get('nombre') as string,
      dni: data.get('dni') as string,
      email: data.get('email') as string,
      contraseña: data.get('contraseña') as string,
      esAdmin: false
    }

    if (await comprobarDatos(user)) {
      if (await addUser(user)) {
        setLogueado(user.email);
      }
    }
  };

  const emailLogueado = logueado || sessionStorage.getItem("usuario");

  if (emailLogueado) {
    return <Navigate to="/products" />;
  }

  async function comprobarDatos(user: User): Promise<boolean> {
    if (user.nombre.length === 0) {
      setErrorMessage("Error: El nombre no puede estar vacío");
      return false;
    }

    if (user.dni.length === 0) {
      setErrorMessage("Error: El dni no puede estar vacío");
      return false;
    }

    if (user.dni.length !== 9) {
      setErrorMessage("Error: El dni debe contener 9 carácteres");
      return false;
    }

    if (JSON.stringify(await findUserByDni(user.dni)) !== "{}") {
      setErrorMessage("Error: El dni introducido ya existe");
      return false;
    }

    if (user.email.length === 0) {
      setErrorMessage("Error: El email no puede estar vacío");
      return false;
    }

    if ((JSON.stringify(await findUserByEmail(user.email)) !== "{}")) {
      setErrorMessage("Error: El email introducido ya existe");
      return false;
    }

    if (!(user.email.includes('@') && (user.email.endsWith('.com') || user.email.endsWith('.es')))) {
      setErrorMessage("Error: El formato del email no es válido");
      return false;
    }

    if (user.contraseña.length === 0) {
      setErrorMessage("Error: La contraseña no puede estar vacía");
      return false;
    }

    setErrorMessage('');
    return true;
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
            Registrarse
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="nombre"
              label="Nombre"
              name="nombre"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="dni"
              label="DNI"
              name="dni"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="contraseña"
              label="Contraseña"
              type="password"
              id="filled-password-input"
              autoComplete="current-contraseña"
            />
            {errorMessage && (
              <p className="error"> {errorMessage} </p>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Completar registro
            </Button>
            <Grid container>
              <Grid item>
              <Link to={"/login"}>
                  <Typography key="login" sx={{ my: 1, color: 'blue', textAlign:"center", display: 'block' }}>
                    Iniciar Sesión
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  ); 
}


