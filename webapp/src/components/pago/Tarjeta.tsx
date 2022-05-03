import { Box, Button, createTheme, Grid, TextField, ThemeProvider, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { addPedido, findUserByEmail, getNextNumberPedido, isAdmin } from "../../api/api";
import { Estado, FormPagos, Pedido } from "../../shared/shareddtypes";
import Error403 from "../error/Error403";
import { getDireccionPedido } from "./Pago";
import PaymentIcon from '@mui/icons-material/Payment';
import { getTotal } from "../pedidos/ResumenPedido";
import PedidoCompletado from "../pedidoCompletado/PedidoCompletado";

const theme = createTheme();

const Tarjeta: React.FC = () => {
    const numTarjetaRegex = /^([0-9]{4}){1}( [0-9]{4}){3}$/
    const fechaTarjetaRegex = /^(0[1-9]|1[0-2])\/([0-9]{4}|[0-9]{2})$/
    const numSeguridadTarjetaRegex = /^[0-9]{3}$/
    const initialValues: FormPagos = getDireccionPedido();

    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState(initialValues);
    const [isSubmit, setIsSubmit] = useState(false);
    const [carrito,] = useState<{ id_producto: string, cantidad: number, precio: number }[]>(generarCarrito());
    const [generado, setGenerado] = useState(false);
    const [esAdmin, setEsAdmin] = useState(false);

    function generarCarrito(): { id_producto: string, precio: number, cantidad: number }[] {
        let carrito: { id_producto: string, precio: number, cantidad: number }[] = [];

        for (let i: number = 0; i < sessionStorage.length - 1; i++) {
            let key: string = sessionStorage.key(i)!;
            if(key.includes("prod")){
                let id_producto = JSON.parse(sessionStorage.getItem(key)!).id;
                let precio = JSON.parse(sessionStorage.getItem(key)!).precio;
                let qty = Number.parseInt(JSON.parse(sessionStorage.getItem(key)!).qty);

                carrito.push({ id_producto: id_producto, precio: (precio * qty), cantidad: qty });
            }
        }

        return carrito;
    }

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);

        // let correct = true;
        // let values: (keyof FormPagos)[] = [
        //     'numTarjeta', 'fechaTarjeta', 'numSeguridadTarjeta'];
        // values.forEach(element => {
        //     if (formErrors[element] !== "")
        //         correct = false;
        // });
    };

    const generarPedido = useCallback(async function (values: FormPagos) {
        let numero_pedido: number = await getNextNumberPedido();
        let id_usuario: string = (await findUserByEmail(JSON.parse(sessionStorage.getItem("usuario")!).email))._id;

        let pedido: Pedido = {
            _id: '',
            numero_pedido: numero_pedido,
            id_usuario: id_usuario,
            precio_total: getTotal(),
            estado: Estado.pendiente,
            fecha: '',
            lista_productos: carrito,
            direccion: {
                calle: values.calle,
                localidad: values.localidad,
                provincia: values.provincia,
                pais: values.pais,
                codigo_postal: Number.parseInt(values.codigo_postal)
            },
            tarjeta: {
                numero_tarjeta: Number.parseInt(values.numTarjeta),
                fecha_caducidad: values.fechaTarjeta,
                numero_seguridad: Number.parseInt(values.numSeguridadTarjeta),
            }
        };

        let gen = await addPedido(pedido);
        if (gen) {
            setGenerado(gen);

            let usuario = sessionStorage.getItem("usuario")!;
            sessionStorage.clear();
            sessionStorage.setItem("usuario", usuario);
            sessionStorage.setItem("pedido_generado", numero_pedido.toString());
        }
    }, [carrito])

    const actualizarEsAdmin = useCallback(async () => {
        setEsAdmin(await isAdmin(JSON.parse(sessionStorage.getItem("usuario")!).email))
      }, []);
    
    useEffect(() => {
    actualizarEsAdmin()
    }, [esAdmin, actualizarEsAdmin])

    useEffect(() => {
        let correct: boolean = true;
        (Object.keys(formErrors) as (keyof typeof formErrors)[]).forEach(key => {
            if (!(formErrors[key].length === 0)) {
                correct = false;
            }
        });

        if (correct && isSubmit) {
            generarPedido(formValues);
        } else {
            setIsSubmit(false);
        }
    }, [formErrors, formValues, generarPedido, isSubmit]);

    if (!sessionStorage.getItem("usuario"))
        return <Error403></Error403>
    else
        if (esAdmin)
            return <Error403></Error403>


    if (generado) {
        return <PedidoCompletado></PedidoCompletado>
    }

    const validate = (formValues: FormPagos) => {
        const errors = {
            calle: "", localidad: "", provincia: "", pais: "", codigo_postal: "",
            numTarjeta: "", fechaTarjeta: "", numSeguridadTarjeta: ""
        };


        if(!numTarjetaRegex.test(formValues.numTarjeta)){
            errors.numTarjeta = "El número de tarjeta no es válido";
        }
        if(!fechaTarjetaRegex.test(formValues.fechaTarjeta)){
            errors.fechaTarjeta = "La fecha de caducidad de la tarjeta no es válida";
        }
        let mesTarjeta: number = Number.parseInt(formValues.fechaTarjeta.split("/")[0]);
        let añoTarjeta: number = Number.parseInt(formValues.fechaTarjeta.split("/")[1]);

        let diasMes: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let fechaTarjeta: Date = new Date("20"+añoTarjeta+"-"+mesTarjeta+"-"+diasMes[mesTarjeta-1])
        let fechaActual: Date = new Date();
      
        if(!(fechaTarjeta>fechaActual)){
            errors.fechaTarjeta = "La tarjeta está caducada";
        }

        if(!numSeguridadTarjetaRegex.test(formValues.numSeguridadTarjeta)){
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
        return <p style={{ color: 'red', width: '20em', maxWidth: '500px' }}>{props.error}</p>;
    }
    return (
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
                    value={formValues.numTarjeta}
                    onChange={handleChange}
                />
                <Error error={formErrors.numTarjeta} />
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
                    value={formValues.fechaTarjeta}
                    onChange={handleChange}
                />
                <Error error={formErrors.fechaTarjeta} />
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
                    value={formValues.numSeguridadTarjeta}
                    onChange={handleChange}
                />
                <Error error={formErrors.numSeguridadTarjeta} />
            </Grid>
            <Button type="submit" size="large" variant="contained" sx={{ mt: 3, mb: 2 }}>
                Pagar
            </Button>
            </Box>
        </Grid>
      </ThemeProvider>
    </Box>
    );
}

export default Tarjeta;
