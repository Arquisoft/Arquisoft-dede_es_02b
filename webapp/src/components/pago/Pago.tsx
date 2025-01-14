import * as React from 'react';
import { useCallback, useEffect, useState} from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PaymentIcon from '@mui/icons-material/Payment';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Error403 from '../error/Error403';
import { FormPagos, SolidDireccion} from '../../shared/shareddtypes';
import './PopUpSolid.css';
import {getAddressesFromPod } from '../../api/api';
import ResumenPedido from '../pedidos/ResumenPedido';
import { isAdmin } from '../../api/api';

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
  // const numTarjetaRegex = /^([0-9]{4}){1}( [0-9]{4}){3}$/
  // const fechaTarjetaRegex = /^(0[1-9]|1[0-2])\/([0-9]{4}|[0-9]{2})$/
  // const numSeguridadTarjetaRegex = /^[0-9]{3}$/

  const initialValues: FormPagos = {calle: "", localidad: "", provincia: "", pais: "", codigo_postal: "", 
                                    numTarjeta: "", fechaTarjeta: "", numSeguridadTarjeta: ""};
  const erroresIniciales =  {calle: "", localidad: "", provincia: "", pais: "", codigo_postal: "", 
  numTarjeta: "", fechaTarjeta: "", numSeguridadTarjeta: ""};

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(erroresIniciales);

  const[buttonPopup, setButtonPopup] = useState(false);
  const[solidDirecciones, setSolidDirecciones] = useState<SolidDireccion[]>();

  const direccionInicialSolid = {calle: "", localidad: "", provincia: "", pais: "", codigo_postal: ""};
  const[, setDireccionSeleccionada] = useState<SolidDireccion>(direccionInicialSolid);

  const [isSubmit,] = useState(false);

  const [generado, setGenerado] = useState(false);
  const [esAdmin, setEsAdmin] = useState(false);

  const handleChange = (e: any) => {
    const {name, value} = e.target;
    setFormValues({...formValues, [name]: value});
  };

  const actualizarEsAdmin = useCallback(async () => { 
    setEsAdmin(await isAdmin(JSON.parse(sessionStorage.getItem("usuario")!).email))
  }, []);

  useEffect(() => {
    actualizarEsAdmin()
  }, [esAdmin, actualizarEsAdmin])

  if(sessionStorage.length < 2)
    return <Error403></Error403>

  if (!sessionStorage.getItem("usuario"))
    return <Error403></Error403>
  else
    if (esAdmin)
      return <Error403></Error403>


  if (generado){
      pago=formValues;
      return <ResumenPedido/> //TODO Redirección a checkout
  }

  async function getFromPod(callback: Function){
    let webId: string = JSON.parse(sessionStorage.getItem("usuario")!).webId;
    let addresses: string[] = await getAddressesFromPod(webId.toLowerCase());
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
    
    let correct = true;
    let values: (keyof FormPagos)[] = ['calle', 'localidad', 'provincia', 'pais', 'codigo_postal',
                                        'numTarjeta', 'fechaTarjeta', 'numSeguridadTarjeta'];                          
    values.forEach(element => {
      if(formErrors[element].toString().length!==0)
        correct=false;
    });
    console.log(correct)

    if(correct){
      setGenerado(true)
      let address = {street1: formValues.calle, city: formValues.localidad, state: formValues.provincia, 
                    country: formValues.pais, zipcode: formValues.codigo_postal};  
      sessionStorage.setItem('address', JSON.stringify(address));
    }
    
    if(correct && isSubmit){
      console.log(sessionStorage);
    }
  };

  const validate = (formValues: FormPagos) => {
    const errors = formErrors;

    if(!formValues.calle)
      errors.calle = "Calle requerida";
    else
      errors.calle = "";

    if(!formValues.localidad)
      errors.localidad = "Localidad requerida";
    else
      errors.localidad = "";

    if(!formValues.provincia)
      errors.provincia = "Provincia requerida";
    else
      errors.provincia = "";

    if(!formValues.pais)
      errors.pais = "País requerido";
    else
      errors.pais = "";

    if(!formValues.codigo_postal)
      errors.codigo_postal = "Código postal requerido";
    else
      errors.codigo_postal = "";

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
          style={{ minHeight: '100vh'}}
        >
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{
            display: 'grid',
            gap: 1,
            gridTemplateColumns: 'repeat(1, 1fr)',
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
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              Siguiente
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

