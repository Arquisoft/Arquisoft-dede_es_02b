import React, { useState, useEffect } from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { Pedido, Estado } from '../../shared/shareddtypes';
import { isElementOfType } from 'react-dom/test-utils';
import EditIcon from '@mui/icons-material/Edit';
import { Autocomplete, Backdrop, Button, Fade, Modal, TextField } from '@mui/material';
import { FilterAltRounded } from '@mui/icons-material';
import  {getPedidos} from '../../api/api';

const opcionesFiltrado=[
    {label:'Nº Pedido'},
    {label:'Fecha'},
    {label:'Estado'},
    {label:'Cliente'},
]

const opcionesEstado=[
  {label:Estado.entregado},
  {label:Estado.reparto},
  {label:Estado.pendiente},
  {label:Estado.listo},
  {label:Estado.cancelado},
]


function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Pedido;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'numero_pedido',
    numeric: false,
    disablePadding: true,
    label: 'Nº Pedido',
  },
  {
    id: 'fecha',
    numeric: false,
    disablePadding: false,
    label: 'Fecha',
  },
  {
    id: 'precio_total',
    numeric: false,
    disablePadding: false,
    label: 'Total del Pedido',
  },
  {
    id: 'estado',
    numeric: false,
    disablePadding: false,
    label: 'Estado',
  },
  {
    id: 'id_usuario',
    numeric: false,
    disablePadding: false,
    label: 'Cliente',
  },
  {
    id: 'direccion',
    numeric: false,
    disablePadding: false,
    label: 'Dirección',
  },
  {
    id: 'lista_productos',
    numeric: false,
    disablePadding: false,
    label: 'Productos',
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Pedido) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof Pedido) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  seleccionados: readonly String[];
  borrar : Function;
  filtrar: Function;
}

var palabraFiltrada:string=""
var tipoFiltrado:string=opcionesFiltrado[0].label

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected, seleccionados, borrar , filtrar} = props;
  const [filtrado, setFiltrado] = React.useState<Boolean>(false);
  let quitarFiltrado = document.getElementById('quitarFiltrado');
  if(quitarFiltrado!=null){
    quitarFiltrado.addEventListener('click', ()=>setFiltrado(false));
    quitarFiltrado.addEventListener('click', ()=>palabraFiltrada="");
    quitarFiltrado.addEventListener('click', ()=>filtrar());
  }
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Pedidos
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete" onClick={()=>borrar()}>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (<div>
            {filtrado ? (
              <Typography sx={{ display: 'flex' }} component="div">
                <Button variant="outlined" onClick={()=>filtrar()}>Filtrar</Button>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={opcionesFiltrado}
                    sx={{ width: 300 }}
                    defaultValue={opcionesFiltrado[0]}
                    renderInput={(params) => <TextField {...params} label="Opciones" />}
                    onChange={(event, newValue) => {
                      if(newValue!=null)
                          tipoFiltrado = newValue.label;
                    }}
                  />
                <TextField id="outlined-basic" label="Filtrar" variant="outlined" onChange={(e)=>palabraFiltrada=e.target.value}/>
                <Tooltip title="Filter list">
                  <IconButton id="quitarFiltrado">
                    <FilterListIcon />
                  </IconButton>
                </Tooltip>
              </Typography>
            ):(
              <Tooltip title="Filter list">
                <IconButton onClick={()=>setFiltrado(true)}>
                  <FilterListIcon/>
                </IconButton>
              </Tooltip>
            )}
          </div>
      )}
    </Toolbar>
  );
};

type PedidoProps = {
  pedidos: Pedido[];
}

const ListaPedidos:React.FC<PedidoProps>=(props: PedidoProps)=> {

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Pedido>('numero_pedido');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [state, setState] = React.useState<Pedido[]>(props.pedidos);
  const [lastState, setLastState] = React.useState<Pedido[]>(state);
  const [rowState, setRowState]=React.useState<Pedido>(state[0]);

  function borrar(seleccionados: readonly String[]) {
    var opcion=window.confirm("¿Seguro de que quieres eliminar el pedido?");
    if(opcion){
      var lista = state;
      for (let index = 0; index < lista.length; index++) {
        for (let j = 0; j < seleccionados.length; j++) {
          const seleccionado = seleccionados[j];
          const element = lista[index];
          console.log(element);
          console.log(seleccionado);
          if(seleccionado.match(element._id)!=null){
            lista.splice(index,1);
            seleccionados= seleccionados.filter((f)=>{return f!=seleccionados[j]})
            j--;
          }
        }
        console.log(lista);
      }    
      setState(lista);
      setSelected([]);
    }
  };

  function filtrar(palabra:string, tipoFiltrado:string){
    var lista = lastState;
    if(palabra!=""){
      if(tipoFiltrado==opcionesFiltrado[0].label)
        lista = lista.filter((f)=>{ return f.numero_pedido.toString()==palabra})
      if(tipoFiltrado==opcionesFiltrado[1].label)
        lista = lista.filter((f)=>{ return f.fecha==palabra})
      if(tipoFiltrado==opcionesFiltrado[2].label)
        lista = lista.filter((f)=>{ return f.estado==palabra})
      if(tipoFiltrado==opcionesFiltrado[3].label)
        lista = lista.filter((f)=>{ return f.id_usuario==palabra})
    }
    setState(lista);
  }

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Pedido,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = props.pedidos.map((n) => n.numero_pedido.toString());
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function editar(row:Pedido){
    setRowState(row);
    setOpen(true);
  }

  var estado:Estado=opcionesEstado[0].label;

  function editarEstado(){
    var lista = state;
    for (let index = 0; index < lista.length; index++) {
      const element = lista[index];
      if(rowState._id===element._id){
        lista[index].estado=estado;
      }
      
    }
    setState(lista);
    setOpen(false);
  }

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - state.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} seleccionados={selected} borrar={()=>borrar(selected)} filtrar={()=>filtrar(palabraFiltrada, tipoFiltrado)}/>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={1}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
              {state
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.numero_pedido.toString());
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      //onClick={(event) => handleClick(event, row.nPedido)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.numero_pedido}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          onClick={(event) => handleClick(event, row.numero_pedido.toString())}
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {String(row.numero_pedido)}
                      </TableCell>
                      <TableCell align="left">{row.fecha}</TableCell>
                      <TableCell align="left">{row.precio_total}</TableCell>
                      <TableCell align="left">{row.estado}</TableCell>
                      <TableCell align="left">{row.id_usuario}</TableCell>
                      <TableCell align="left">{row.direccion.calle+", "+row.direccion.localidad+", "+row.direccion.provincia+", "+row.direccion.pais+", "+row.direccion.codigo_postal}</TableCell>
                      <TableCell align="left">{row.lista_productos.map((registro)=>{return "id: "+registro.id_producto+", cantidad: "+registro.cantidad+", precio: "+registro.precio+"€"})}</TableCell>
                      <TableCell><IconButton onClick={()=>editar(row)}><EditIcon/></IconButton></TableCell>
                      <Modal
                      aria-labelledby="transition-modal-title"
                      aria-describedby="transition-modal-description"
                      open={open}
                      onClose={handleClose}
                      closeAfterTransition
                      BackdropComponent={Backdrop}
                      BackdropProps={{
                        timeout: 500,
                      }}
                    >
                      <Fade in={open}>
                        <Box sx={modalStyle}>
                          <Typography id="transition-modal-title" variant="h6" component="h2">
                            Cambiar estado
                          </Typography>
                          <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={opcionesEstado}
                            sx={{ width: 300, paddingTop:2, paddingBottom:2}}
                            defaultValue={opcionesEstado[0]}
                            renderInput={(params) => <TextField {...params} label="Opciones" />}
                            onChange={(event, newValue) => {
                              if(newValue!=null)
                                  estado = newValue.label;
                            }}
                          />
                          <Button onClick={()=>editarEstado()}>Editar</Button>
                        </Box>
                      </Fade>
                    </Modal>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={props.pedidos.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

export default ListaPedidos;
