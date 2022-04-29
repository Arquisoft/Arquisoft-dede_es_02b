import * as React from 'react';
import { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PaymentIcon from '@mui/icons-material/Payment';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Error403 from '../error/Error403';
import { getAddressesFromPod } from '../../FuntionSolidConnection';

const theme = createTheme();

function Pago(): JSX.Element {
  const [calle, setCalle] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [provincia, setProvincia] = useState("");
  const [pais, setPais] = useState("");
  const [codPostal, setCodPostal] = useState("");

  const [numTarjeta, setNumTarjeta] = useState("");
  const [fechaTarjeta, setFechaTarjeta] = useState("");
  const [numSeguridadTarjeta, setNumSeguridadTarjeta] = useState("");

  const [errorMessage, setErrorMessage] = useState('');

  const tarjetaRegex = /([0-9]{4}){1}( [0-9]{4}){3}/

  if (!sessionStorage.getItem("usuario"))
    return <Error403></Error403>
  else
    if (JSON.parse(sessionStorage.getItem("usuario")!).esAdmin)
      return <Error403></Error403>

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!numTarjeta.match(tarjetaRegex))
      setErrorMessage('La tarjeta es incorrecta');
  };

  function botonPod(): JSX.Element{
    if(JSON.parse(sessionStorage.getItem("usuario")!).webId){
      return <Button onClick={handlePOD} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Obtener de POD</Button>
    }
    return <></>
  }

  function direccionRellenado(): boolean {
    return !((calle.trim().length==0 || calle==null) && (localidad.trim().length==0 || localidad==null) && (provincia.trim().length==0 || provincia==null)
              && (pais.trim().length==0 || pais==null) && (codPostal.trim().length==0 || codPostal==null));
  }

  function tarjetaRellenado(): boolean {
    return !((numTarjeta.trim().length==0 || numTarjeta==null) && (fechaTarjeta.trim().length==0 || fechaTarjeta==null)
              && (numSeguridadTarjeta.trim().length==0 || numSeguridadTarjeta==null));
  }

  function SubmitButton(): JSX.Element {
    if (direccionRellenado() && tarjetaRellenado()) {
      return <Button type="submit" size="large" variant="contained" sx={{ mt: 3, mb: 2 }}>
              Pagar
             </Button>
    } else {
      return <Button type="submit" size="large" variant="contained" sx={{ mt: 3, mb: 2 }} disabled>
              Pagar
             </Button>
    };
  };

  async function handlePOD() {
    let webId: string = JSON.parse(sessionStorage.getItem("usuario")!).webId;
    let addresses: string[] = await getAddressesFromPod('https://' + webId.toLowerCase() + '/profile/card#me');
    console.log(addresses)
    if(addresses.length > 0){
      console.log(addresses);
    }
  }

  return (
    <>
    <Box sx={{ flexGrow: 1, padding: 3}}>
      <ThemeProvider theme={theme}>
        <Typography variant="h1" component="h2" sx={{fontSize:40}}>
          Pago <PaymentIcon/>
        </Typography>
        <Grid
          container
          direction="column"
          alignItems="center"
          style={{ minHeight: '100vh' }}
        >
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{
            display: 'grid',
            gap: 1,
            gridTemplateColumns: 'repeat(2, 1fr)',
          }}>
            <Grid item sx={{
              display: 'grid'
            }}>
              <Typography component="h2" variant="h6">
                Dirección
              </Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="calle"
                label="Calle"
                name="calle"
                autoComplete="calle"
                autoFocus
                value = {calle}
                onChange={(e: any) => setCalle(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="localidad"
                label="Localidad"
                name="localidad"
                autoComplete="localidad"
                autoFocus
                value = {localidad}
                onChange={(e: any) => setLocalidad(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="provincia"
                label="Provincia"
                name="provincia"
                autoComplete="provincia"
                autoFocus
                value = {provincia}
                onChange={(e: any) => setProvincia(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="pais"
                label="País"
                name="pais"
                autoComplete="pais"
                autoFocus
                value = {pais}
                onChange={(e: any) => setPais(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="codPostal"
                label="Código Postal"
                name="codPostal"
                autoComplete="codPostal"
                autoFocus
                value = {codPostal}
                onChange={(e: any) => setCodPostal(e.target.value)}
              />
              <Grid item alignItems="stretch" style={{ display: "flex" }}>
                {botonPod()}                
              </Grid>
            </Grid>
            <Grid>
              <Typography component="h2" variant="h6">
                Tarjeta
              </Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                name="numeroTarjeta"
                label="Número de Tarjeta"
                type="numeroTarjeta"
                id="numeroTarjeta"
                autoComplete="numeroTarjeta"
                onChange={(e: any) => setNumTarjeta(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="fechaTarjeta"
                label="Fecha de caducidad"
                type="fechaTarjeta"
                id="fechaTarjeta"
                autoComplete="fechaTarjeta"
                onChange={(e: any) => setFechaTarjeta(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="numSeguridadTarjeta"
                label="Número de seguridad"
                type="numSeguridadTarjeta"
                id="numSeguridadTarjeta"
                autoComplete="numSeguridadTarjeta"
                onChange={(e: any) => setNumSeguridadTarjeta(e.target.value)}
              />
            </Grid>
          {errorMessage && (
            <p style={{ color: 'red' }} className="error"> {errorMessage} </p>
          )}
          </Box>
          <SubmitButton />
        </Grid>
      </ThemeProvider>
    </Box>
    </>
  );
}

export default Pago;