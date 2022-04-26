import { Button, Container, Grid, TextareaAutosize, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { addProduct } from '../../api/api';
import { Product } from '../../shared/shareddtypes';
import Error403 from '../error/Error403';


const EditarUsuario: React.FC = () => {

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        
    };

    if(!sessionStorage.getItem("usuario"))
        return <Error403></Error403>
    else
        if(!JSON.parse(sessionStorage.getItem("usuario")!).esAdmin)
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
                            id="apeliidos"
                            label="Apellidos"
                            name="apeliidos"
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
                <Link to="/products">
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