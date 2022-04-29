import * as React from 'react';
import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PaymentIcon from '@mui/icons-material/Payment';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Error403 from '../error/Error403';
import { getAddressesFromPod } from '../../FuntionSolidConnection';
import { FormPagos } from '../../shared/shareddtypes';

const theme = createTheme();

function Pago(): JSX.Element {
  const numTarjetaRegex = /([0-9]{4}){1}( [0-9]{4}){3}/
  const fechaTarjetaRegex = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/
  const numSeguridadTarjetaRegex = /[0-9]{3}/

  const initialValues: FormPagos = {calle: "", localidad: "", provincia: "", pais: "", codigo_postal: "", 
                                    numTarjeta: "", fechaTarjeta: "", numSeguridadTarjeta: ""};
  const[formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialValues);
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e: any) => {
    const {name, value} = e.target;
    setFormValues({...formValues, [name]: value});
  };

  useEffect(() => {
    let correct: boolean = true;
    (Object.keys(formErrors) as (keyof typeof formErrors)[]).forEach(key => {
      if(!(formErrors[key].length===0)){
        correct = false;
      }
    });
    
    if(correct && isSubmit){

    }else{
      setIsSubmit(false);
    }
  }, [formErrors]);

  if (!sessionStorage.getItem("usuario"))
    return <Error403></Error403>
  else
    if (JSON.parse(sessionStorage.getItem("usuario")!).esAdmin)
      return <Error403></Error403>

  function botonPod(): JSX.Element{
    if(JSON.parse(sessionStorage.getItem("usuario")!).webId){
      return <Button onClick={handlePOD} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Obtener de POD</Button>
    }
    return <></>
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const validate = (formValues: FormPagos) => {
    const errors = {calle: "", localidad: "", provincia: "", pais: "", codigo_postal: "",
                      numTarjeta: "", fechaTarjeta: "", numSeguridadTarjeta: ""};

    if(!formValues.calle)
      errors.calle = "Calle requerida";
    if(!formValues.localidad)
      errors.localidad = "Localidad requerida";
    if(!formValues.provincia)
      errors.provincia = "Provincia requerida";
    if(!formValues.pais)
      errors.pais = "País requerido";
    if(!formValues.codigo_postal)
      errors.codigo_postal = "Código postal requerido";


    if(!formValues.numTarjeta.match(numTarjetaRegex))
      errors.numTarjeta = "El número de tarjeta no es válido";
    if(!formValues.fechaTarjeta.match(fechaTarjetaRegex))
      errors.fechaTarjeta = "La fecha de caducidad de la tarjeta no es válida";
    if(!formValues.numSeguridadTarjeta.match(numSeguridadTarjetaRegex))
      errors.numSeguridadTarjeta = "El número de seguridad de la tarjeta no es válido";

    if(!formValues.numTarjeta)
      errors.numTarjeta = "Número de tarjeta requerido";
    if(!formValues.fechaTarjeta)
      errors.fechaTarjeta = "Fecha de caducidad de tarjeta requerida";
    if(!formValues.numSeguridadTarjeta)
      errors.numSeguridadTarjeta = "Número de seguridad de tarjeta requerido";


    return errors;
  }
  
  async function handlePOD() {
    let webId: string = JSON.parse(sessionStorage.getItem("usuario")!).webId;
    let addresses: string[] = await getAddressesFromPod('https://' + webId.toLowerCase() + '/profile/card#me');
    console.log(addresses)
    if(addresses.length > 0){
      console.log(addresses);
    }
  }

  interface ErrorMessage {
    error: string;
  }

  function Error(props: ErrorMessage) {
    return <p style={{color: 'red', width: '20em', maxWidth: '500px'}}>{props.error}</p>;
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
              value = {formValues.calle}
              onChange={handleChange}
              />
              <Error error={formErrors.calle}/>
              <TextField
                margin="normal"
                required
                fullWidth
                id="localidad"
                label="Localidad"
                name="localidad"
                autoComplete="localidad"
                autoFocus
                value = {formValues.localidad}
                onChange={handleChange}
              />
              <Error error={formErrors.localidad}/>
              <TextField
                margin="normal"
                required
                fullWidth
                id="provincia"
                label="Provincia"
                name="provincia"
                autoComplete="provincia"
                autoFocus
                value = {formValues.provincia}
                onChange={handleChange}
              />
              <Error error={formErrors.provincia}/>
              <TextField
                margin="normal"
                required
                fullWidth
                id="pais"
                label="País"
                name="pais"
                autoComplete="pais"
                autoFocus
                value = {formValues.pais}
                onChange={handleChange}
              />
              <Error error={formErrors.pais}/>
              <TextField
                margin="normal"
                required
                fullWidth
                id="codigo_postal"
                label="Código Postal"
                name="codigo_postal"
                autoComplete="codigo_postal"
                autoFocus
                value = {formValues.codigo_postal}
                onChange={handleChange}
              />
              <Error error={formErrors.codigo_postal}/>
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
                name="numTarjeta"
                label="Número de Tarjeta"
                type="numTarjeta"
                id="numTarjeta"
                autoComplete="numTarjeta"
                placeholder="Ejemplo: 1234 1234 1234 1234"
                value = {formValues.numTarjeta}
                onChange={handleChange}
              />
              <Error error={formErrors.numTarjeta}/>
              <TextField
                margin="normal"
                required
                fullWidth
                name="fechaTarjeta"
                label="Fecha de caducidad"
                type="fechaTarjeta"
                id="fechaTarjeta"
                autoComplete="fechaTarjeta"
                placeholder="Ejemplo: MM/YY"
                value = {formValues.fechaTarjeta}
                onChange={handleChange}
              />
              <Error error={formErrors.fechaTarjeta}/>
              <TextField
                margin="normal"
                required
                fullWidth
                name="numSeguridadTarjeta"
                label="Número de seguridad"
                type="numSeguridadTarjeta"
                id="numSeguridadTarjeta"
                autoComplete="numSeguridadTarjeta"
                placeholder="Ejemplo: 111"
                value = {formValues.numSeguridadTarjeta}
                onChange={handleChange}
              />
              <Error error={formErrors.numSeguridadTarjeta}/>
            </Grid>
            <Button type="submit" size="large" variant="contained" sx={{ mt: 3, mb: 2 }}>
              Pagar
            </Button>
          </Box>
        </Grid>
      </ThemeProvider>
    </Box>
    </>
  );
}

export default Pago;