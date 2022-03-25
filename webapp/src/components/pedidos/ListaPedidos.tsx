import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import accounting from 'accounting';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { Pedido } from '../../shared/shareddtypes';

const columns: GridColDef[] = [
  {
    field: 'nPedido',
    headerName: 'Nº Pedido',
    width:110,
    editable: false,
  },
  {
    field: 'fecha',
    headerName: 'Fecha',
    width: 110,
    editable: false,
  },
  {
    field: 'totalPedido',
    headerName: 'TotalPedido',
    width: 110,
    editable: false,
    sortable: false,
  },
  {
    field: 'estado',
    headerName: 'Estado',
    width: 150,
    editable: false,
    sortable: false,
  },
  {
    field: 'cliente',
    headerName: 'Cliente',
    width: 200,
    editable: false,
    sortable: false,
  },
  {
    field: 'direccion',
    headerName: 'Direccion',
    width: 400,
    editable: false,
    sortable: false,
  },
];

const rows = [
  {id:1, nPedido: 1, fecha: '20-03-2022', totalPedido: accounting.formatMoney(7,'€'), estado: 'Entregado', cliente: 'Cliente1', direccion:'Calle Valdés Salas, 11, 33007 Oviedo, Asturias' },
  {id:2, nPedido: 2, fecha: '21-03-2022', totalPedido: accounting.formatMoney(10,'€'), estado: 'Entregado', cliente: 'Cliente2', direccion:'Calle Valdés Salas, 11, 33007 Oviedo, Asturias'  },
  {id:3, nPedido: 3, fecha: '22-03-2022', totalPedido: accounting.formatMoney(3.45,'€'), estado: 'Listo para entregar', cliente: 'Cliente3', direccion:'Calle Valdés Salas, 11, 33007 Oviedo, Asturias'  },
  {id:4, nPedido: 4, fecha: '23-03-2022', totalPedido: accounting.formatMoney(12.5,'€'), estado: 'Enviado', cliente: 'Cliente4', direccion:'Calle Valdés Salas, 11, 33007 Oviedo, Asturias'  },
  {id:5, nPedido: 5, fecha: '24-03-2022', totalPedido: accounting.formatMoney(8,'€'), estado: 'Preparando', cliente: 'Cliente5', direccion:'Calle Valdés Salas, 11, 33007 Oviedo, Asturias'  },
];

function borrar(rows:Array<Pedido>, ):Array<Pedido>{
  rows.map((_, index) =>{
  });
  
  return rows;
}

const ListaPedidos:React.FC=()=> {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
      <div>
      <Button variant="outlined" startIcon={<DeleteIcon />}>
       Borrar
      </Button>
      </div>
    </div>
  );
}

export default ListaPedidos;
