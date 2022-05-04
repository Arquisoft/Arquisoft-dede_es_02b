import { Button, Container, CssBaseline, Grid, TextareaAutosize, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { addProduct, isAdmin } from '../../api/api';
import { Product } from '../../shared/shareddtypes';
import Error403 from '../error/Error403';


let isAdminTest:boolean=false;

export function setTestAdminAñadirProducto(admin:boolean){
      isAdminTest=admin;
}

const AñadirProducto: React.FC = () => {
    const [añadido, setAñadido] = useState<Boolean>(false);
    const [esAdmin, setEsAdmin] = useState(isAdminTest);

    

    

    const actualizarEsAdmin = useCallback(async () => {
        setEsAdmin(await isAdmin(JSON.parse(sessionStorage.getItem("usuario")!).email))
      }, []);
    
      useEffect(() => {
        actualizarEsAdmin()
      }, [esAdmin, actualizarEsAdmin])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        let producto: Product = {
            _id: '',
            nombre: data.get('nombre') as string,
            origen: data.get('origen') as string,
            precio: Number.parseFloat(data.get('precio') as string),
            descripcion: data.get('descripcion') as string,
            foto: data.get('foto') as string
        }
        
        await addProduct(producto);
        setAñadido(true);
    };

    let usuario: { email: string } = JSON.parse(sessionStorage.getItem("usuario")!);

    if (!usuario || !esAdmin) {
        return <Error403></Error403>
    }

    if(añadido)
        return <Navigate to="/products"></Navigate>

    return (<Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <Typography component="h1" variant="h5">
                Añadir Producto
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            autoComplete="given-name"
                            name="nombre"
                            required
                            fullWidth
                            id="nombre"
                            label="Nombre del Producto"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="origen"
                            label="Origen"
                            name="origen"
                            autoComplete="family-name"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="precio"
                            label="Precio"
                            name="precio"
                            autoComplete="precio"
                            type="number"
                            inputProps={{
                                min: 0,
                                step: "0.25"

                            }}
                            defaultValue={0.0}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            name="foto"
                            label="Foto"
                            id="foto"
                            autoComplete="foto"
                        />
                    </Grid >
                    <Grid item xs={12}>
                        <TextareaAutosize
                            aria-label="Descripcion"
                            minRows={3}
                            placeholder="Descripcion del producto"
                            style={{ width: 500, height: 100 }}
                            name="descripcion"
                            id="descripcion"
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    aria-label='Añadir'
                    sx={{ mt: 3, mb: 2 }}
                >
                    Añadir
                </Button>
            </Box>
        </Box>
    </Container>
    );
}

export default AñadirProducto;