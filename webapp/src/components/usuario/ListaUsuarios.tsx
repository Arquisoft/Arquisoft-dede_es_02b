import React, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getUsers } from '../../api/api';
import { User } from '../../shared/shareddtypes';

function ListaUsuarios(): JSX.Element {

    const [usuarios, setUsuarios] = useState<User[]>([])

    async function getAllUsers(){
        setUsuarios(await getUsers());
    }

    useEffect(()=>{
      getAllUsers();
    }, []);

    return (
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    );
}

export default ListaUsuarios;