import React, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getUsers, deleteUser } from '../../api/api';
import { User } from '../../shared/shareddtypes';
import Error403 from '../error/Error403';
import { Box, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

let usuarioTest:User[]=[];
export function usuariosTest(usuario:User){
    usuarioTest[0]=usuario;
}

function ListaUsuarios(): JSX.Element {

    const [usuarios, setUsuarios] = useState<User[]>(usuarioTest)

    async function getAllUsers(){
        setUsuarios(await getUsers());
    }


    useEffect(()=>{
      getAllUsers();
    }, []);

    if(!sessionStorage.getItem("usuario"))
        return <Error403></Error403>
    else
        if(!JSON.parse(sessionStorage.getItem("usuario")!).esAdmin)
            return <Error403></Error403>

    function borrarUsuario(id:string){
        deleteUser(id);
    }

    return (
      <Box sx={{ flexGrow: 1, padding: 3}}>
        <Typography variant="h1" component="h2" sx={{ fontSize: 40, marginBottom:3 }}>
                Listado de usuarios
            </Typography>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Nombre</TableCell>
            <TableCell align="right">Apellidos</TableCell>
            <TableCell align="right">ID Solid</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">DNI</TableCell>
            <TableCell align="right">Admin/Cliente</TableCell>
            <TableCell align="right">Eliminar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usuarios.map((usuario) => (
            <TableRow
              key={usuario._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{usuario._id}</TableCell>
              <TableCell align="right">{usuario.nombre}</TableCell>
              <TableCell align="right">{usuario.apellidos}</TableCell>
              <TableCell align="right">{usuario.idSolid}</TableCell>
              <TableCell align="right">{usuario.email}</TableCell>
              <TableCell align="right">{usuario.dni}</TableCell>
              <TableCell align="right">{usuario.esAdmin ? "Admin": "Cliente"}</TableCell>
              <TableCell align="right"><IconButton aria-label='delete-icon'onClick={()=>borrarUsuario(usuario._id)}><DeleteIcon/></IconButton></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
    );
}

export default ListaUsuarios;