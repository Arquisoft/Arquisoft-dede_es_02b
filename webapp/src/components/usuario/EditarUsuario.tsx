import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { editUser } from '../../api/api';
import { User } from '../../shared/shareddtypes';
import Error403 from '../error/Error403';


const EditarUsuario: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [editado, setEditado] = useState(false);


    async function comprobarDatos(user: User): Promise<boolean> {
        if (user.nombre.length === 0) {
          setErrorMessage("Error: El nombre no puede estar vacío");
          return false;
        }
    
        if (user.apellidos.length === 0) {
          setErrorMessage("Error: El apellido no puede estar vacío");
          return false;
        }
    
        if (user.idSolid.length === 0) {
          setErrorMessage("Error: El idsolid no puede estar vacío");
          return false;
        }
        setErrorMessage('');
        return true;
    }

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
          esAdmin: false
        }

        if (await comprobarDatos(user)) {
            setEditado(await editUser(user))
        }
    };

    if(editado)
        return <Navigate to="/products" />;

    if(!sessionStorage.getItem("usuario"))
        return <Error403></Error403>
    else
        if(JSON.parse(sessionStorage.getItem("usuario")!).esAdmin)
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
                        required
                        fullWidth
                        id="nombre"
                        label="Nombre"
                        autoFocus
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="apellidos"
                        label="Apellidos"
                        name="apellidos"
                        autoComplete="family-name"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        name="idSolid"
                        label="Id de Solid"
                        id="idSolid"
                        autoComplete="idSolid"
                    />
                </Grid >
            </Grid>
            {errorMessage}
            <Link to={"/products"}>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Editar
                </Button>
            </Link>
            
            
        </Box>
     </Box>
    </Container>
    );
}

export default EditarUsuario;