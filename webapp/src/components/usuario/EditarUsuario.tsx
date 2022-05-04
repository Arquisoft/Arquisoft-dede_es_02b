import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { editUser, isAdmin } from '../../api/api';
import { User } from '../../shared/shareddtypes';
import Error403 from '../error/Error403';

const EditarUsuario: React.FC = () => {
    const [editado, setEditado] = useState(false);
    const [esAdmin, setEsAdmin] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const session = sessionStorage.getItem('usuario');
        let email = "";
        if (session != null) {
            email = JSON.parse(session).email;
        }
    
        const user: User = {
          _id:"",
          nombre: data.get('nombre') as string,
          apellidos: data.get('apellidos') as string,
          idSolid: data.get('idSolid') as string,
          dni: "",
          email: email,
          contraseña: "",
          esAdmin: false,
          foto: data.get('foto') as string
        }

        setEditado(await editUser(user));
    };

    const actualizarEsAdmin = useCallback(async () => {
        setEsAdmin(await isAdmin(JSON.parse(sessionStorage.getItem("usuario")!).email))
      }, []);
    
      useEffect(() => {
        actualizarEsAdmin()
      }, [esAdmin, actualizarEsAdmin])

    if(editado)
        return <Navigate to="/products" />;

    if(!sessionStorage.getItem("usuario"))
        return <Error403></Error403>
    else
        if(esAdmin)
            return <Error403></Error403>

    return (<Container component="main" maxWidth="xs">
    <Box sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }}>
        <Typography component="h1" variant="h5">
            Editar Usuario
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        autoComplete="given-name"
                        name="nombre"
                        fullWidth
                        id="nombre"
                        label="Nombre"
                        autoFocus
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="apellidos"
                        label="Apellidos"
                        name="apellidos"
                        autoComplete="family-name"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        name="idSolid"
                        label="Id de Solid"
                        id="idSolid"
                        autoComplete="idSolid"
                    />
                </Grid >
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        name="foto"
                        label="Foto"
                        id="foto"
                        autoComplete="foto"
                    />
                </Grid >
            </Grid>
            <Button
                    aria-label="btEditar"
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >Editar</Button>
            
            
        </Box>
     </Box>
    </Container>
    );
}

export default EditarUsuario;