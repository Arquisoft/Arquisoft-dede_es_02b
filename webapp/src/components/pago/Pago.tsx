import * as React from 'react';
import { useState, useEffect, useCallback } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PaymentIcon from '@mui/icons-material/Payment';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Error403 from '../error/Error403';
import { getAddressesFromPod } from '../../FuntionSolidConnection';
import { FormPagos, SolidDireccion, Pedido, Estado } from '../../shared/shareddtypes';
import './PopUpSolid.css';
import { addPedido, findUserByEmail, getNextNumberPedido } from '../../api/api';
import ResumenPedido from '../pedidos/ResumenPedido';

const theme = createTheme();

let pago:FormPagos={
  calle: '',
  localidad: '',
  provincia: '',
  pais: '',
  codigo_postal: '',
  numTarjeta: '',
  fechaTarjeta: '',
  numSeguridadTarjeta: ''
};

export function getDireccionPedido():FormPagos{
    return pago;
}

function Pago(): JSX.Element {
  const numTarjetaRegex = /^([0-9]{4}){1}( [0-9]{4}){3}$/
  const fechaTarjetaRegex = /^(0[1-9]|1[0-2])\/([0-9]{4}|[0-9]{2})$/
  const numSeguridadTarjetaRegex = /^[0-9]{3}$/

  const initialValues: FormPagos = {calle: "", localidad: "", provincia: "", pais: "", codigo_postal: "", 
                                    numTarjeta: "", fechaTarjeta: "", numSeguridadTarjeta: ""};
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialValues);

  const[buttonPopup, setButtonPopup] = useState(false);
  const[solidDirecciones, setSolidDirecciones] = useState<SolidDireccion[]>();

  const direccionInicialSolid = {calle: "", localidad: "", provincia: "", pais: "", codigo_postal: ""};
  const[, setDireccionSeleccionada] = useState<SolidDireccion>(direccionInicialSolid);

  const [isSubmit, setIsSubmit] = useState(false);

  const [generado, setGenerado] = useState(false);

  const handleChange = (e: any) => {
    const {name, value} = e.target;
    setFormValues({...formValues, [name]: value});
  };

  if (!sessionStorage.getItem("usuario"))
    return <Error403></Error403>
  else
    if (JSON.parse(sessionStorage.getItem("usuario")!).esAdmin)
      return <Error403></Error403>


  if (generado){
      pago=formValues;
      return <ResumenPedido/> //TODO Redirección a checkout
  }

  async function getFromPod(callback: Function){
    let webId: string = JSON.parse(sessionStorage.getItem("usuario")!).webId;
    let addresses: string[] = await getAddressesFromPod('https://' + webId.toLowerCase() + '/profile/card#me');

    callback(addresses);
  }

  

  function fillAndShowPopup(addresses: string[]){
    let direcciones = new Array<SolidDireccion>(addresses.length);
    if(addresses.length > 0){
      for (let i = 0; i < addresses.length; i++) {
        let campos: string[] = addresses[i].split(";");
        direcciones[i] = {calle: "", localidad: "", provincia: "", pais: "", codigo_postal: ""};
        direcciones[i].calle=campos[0];
        direcciones[i].localidad=campos[1];
        direcciones[i].provincia=campos[2];
        direcciones[i].pais=campos[3];
        direcciones[i].codigo_postal=campos[4];
      }

      setSolidDirecciones(direcciones);
      setButtonPopup(true);
    }
  }

  async function handlePOD() {
    await getFromPod(fillAndShowPopup)
  }

  function BotonPod(): JSX.Element{
    if(JSON.parse(sessionStorage.getItem("usuario")!).webId){
      return <Button onClick={handlePOD} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Obtener de POD</Button>
    }
    return <></>
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormErrors(validate(formValues));

    setGenerado(true)
    
    let correct = true;
    let values: (keyof FormPagos)[] = ['calle', 'localidad', 'provincia', 'pais', 'codigo_postal',
                                        'numTarjeta', 'fechaTarjeta', 'numSeguridadTarjeta'];
    values.forEach(element => {
      if(formErrors[element]!=="")
        correct=false;
    });

    if(correct && isSubmit){
      console.log(sessionStorage);
    }
  };

  const validate = (formValues: FormPagos) => {
    const errors = {calle: "", localidad: "", provincia: "", pais: "", codigo_postal: "",
                      numTarjeta: "", fechaTarjeta: "", numSeguridadTarjeta: ""};

    if(!formValues.calle){
      errors.calle = "Calle requerida";
    }
    if(!formValues.localidad){
      errors.localidad = "Localidad requerida";
    }
    if(!formValues.provincia){
      errors.provincia = "Provincia requerida";
    }
    if(!formValues.pais){
      errors.pais = "País requerido";
    }
    if(!formValues.codigo_postal){
      errors.codigo_postal = "Código postal requerido";
    }

    if(!formValues.numTarjeta.match(numTarjetaRegex)){
      errors.numTarjeta = "El número de tarjeta no es válido";
    }
    if(!formValues.fechaTarjeta.match(fechaTarjetaRegex)){
      errors.fechaTarjeta = "La fecha de caducidad de la tarjeta no es válida";
    }
      if(!formValues.numSeguridadTarjeta.match(numSeguridadTarjetaRegex)){
      errors.numSeguridadTarjeta = "El número de seguridad de la tarjeta no es válido";
    }

    if(!formValues.numTarjeta){
      errors.numTarjeta = "Número de tarjeta requerido";
    }
    if(!formValues.fechaTarjeta){
      errors.fechaTarjeta = "Fecha de caducidad de tarjeta requerida";
    }
    if(!formValues.numSeguridadTarjeta){
      errors.numSeguridadTarjeta = "Número de seguridad de tarjeta requerido";
    }
    return errors;
  }
  
  interface ErrorMessage {
    error: string;
  }

  function Error(props: ErrorMessage) {
    return <p style={{color: 'red', width: '20em', maxWidth: '500px'}}>{props.error}</p>;
  }

  function handleDireccionSeleccionada(index: number){
    if(solidDirecciones!==null && solidDirecciones!==undefined){
      let direccion = solidDirecciones[index];

      let newForm = Object.assign({}, formValues);
      newForm.calle=direccion.calle;
      newForm.localidad=direccion.localidad;
      newForm.provincia=direccion.provincia;
      newForm.pais=direccion.pais;
      newForm.codigo_postal=direccion.codigo_postal;

      setDireccionSeleccionada(direccion)
      setFormValues(newForm)

      setButtonPopup(false);
    }
  }

  function PopUpSolid(){
    return (buttonPopup && solidDirecciones!==null && solidDirecciones!==undefined) ? (
        <div className="popup">
            <div className="popup-inner">
                <h5>Seleccione la dirección</h5>
                  {Array.from(Array(solidDirecciones.length)).map((_, index) => (
                      <Button key={index} onClick={() => handleDireccionSeleccionada(index)} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                          {solidDirecciones[index].calle + ", " 
                            +solidDirecciones[index].localidad + ", "
                            +solidDirecciones[index].provincia + ", "
                            +solidDirecciones[index].pais + ", "
                            +solidDirecciones[index].codigo_postal}
                      </Button>
                  ))}
            </div>
        </div>
    ): <></>;
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
                <BotonPod/>
              </Grid>
            </Grid>

            <Button type="submit" size="large" variant="contained" sx={{ mt: 3, mb: 2 }}>
              Pagar
            </Button>
          </Box>
          <PopUpSolid/>
        </Grid>
      </ThemeProvider>
    </Box>
    </>
  );
}

export default Pago;

