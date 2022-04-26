import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { AddShoppingCart } from '@mui/icons-material';
import accounting from "accounting";
import { Product } from '../../shared/shareddtypes';
import { Alert, Button, Modal, Snackbar, TextField, Fade, Backdrop, TextareaAutosize, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { addToCart } from '../../api/api';
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import "./Products.css";


type ProductProp = {
  product: Product;
}

const ProductItem: React.FC<ProductProp> = (productProp: ProductProp) => {
  const [cantidad, setCantidad] = useState(1);
  const [producto, setProducto] = useState<Product>(productProp.product);
  const [nombre, setNombre] = useState<string>(productProp.product.nombre);
  const [origen, setOrigen] = useState<string>(productProp.product.origen);
  const [precio, setPrecio] = useState<number>(productProp.product.precio);
  const [foto, setFoto] = useState<string>(productProp.product.foto);
  const [descripcion, setDescripcion] = useState<string>(productProp.product.descripcion);

  const handleAddCart = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addToCart(producto, cantidad);
  }
  function sumarCantidad(n: number) {
    var c = cantidad;
    c = c + (1 * n);
    if (c < 11 && c > 0) {
      setCantidad(c);
    }
  }

  const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleCloseEditor = () => setOpenEdit(false);

  function editarProducto() {
    var p = producto;
    p.nombre=nombre;
    p.origen=origen;
    p.precio=precio;
    p.descripcion=descripcion;
    p.foto=foto;
    setProducto(p);
    setOpenEdit(false);
  }

  return (
    <form name="AddItem" onSubmit={handleAddCart}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
          {producto.nombre} x{cantidad} añadido al carrito
        </Alert>
      </Snackbar>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openEdit}
        onClose={handleCloseEditor}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openEdit}>
          <Box sx={modalStyle}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Cambiar estado
            </Typography>
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
                  defaultValue={nombre}
                  onChange={event=>setNombre(event.target.value)}
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
                  defaultValue={origen}
                  onChange={event=>setOrigen(event.target.value)}
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
                  defaultValue={precio}
                  onChange={event=>setPrecio(Number(event.target.value))}
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
                  defaultValue={foto}
                  onChange={event=>setFoto(event.target.value)}
                />
              </Grid >
              <Grid item xs={12}>
                <TextareaAutosize
                  aria-label="Descripcion"
                  minRows={3}
                  placeholder="Descripcion del producto"
                  style={{ width: 332, height: 100 }}
                  name="descripcion"
                  id="descripcion"
                  defaultValue={descripcion}
                  onChange={event=>setDescripcion(event.target.value)}
                />
              </Grid>
            </Grid>
            <Button onClick={() => editarProducto()}>Editar</Button>
          </Box>
        </Fade>
      </Modal>
      <Card id="product" sx={{ maxWidth: 545 }}>
        <CardMedia
          component="img"
          alt={producto.nombre}
          height="200"
          image={producto.foto}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {producto.nombre}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {producto.descripcion}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Origen: {producto.origen}
          </Typography>
        </CardContent>
        <CardActions sx={{ flexDirection: "row-reverse", justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', flexDirection: "row-reverse", alignItems: 'center' }}>
            <IconButton aria-label='delete-item'>
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={() => setOpenEdit(true)}><EditIcon /></IconButton>
            <IconButton type="submit" onClick={handleClick}>
              <AddShoppingCart />
            </IconButton>
            <Typography sx={{ fontSize: 20 }}> {accounting.formatMoney(producto.precio, "€")}</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: "row-reverse", alignItems: 'center' }}>
            <IconButton onClick={() => sumarCantidad(1)}><AddIcon /></IconButton>
            <TextField
              id="cantidad-producto"
              sx={{
                width: 34,
                paddingRight: 1,
                paddingLeft: 1,
                textAlign: 'center',
              }}
              inputProps={{ min: 1, max: 10, style: { textAlign: 'center' } }}
              variant="standard"
              defaultValue={1}
              value={cantidad}
              
              
              onChange={(e) => {
                if(e.target.value===""){
                    setCantidad(1)
                }
                else
                  setCantidad(parseInt(e.target.value))
                
              }
              }
            />
            <IconButton onClick={() => sumarCantidad(-1)}><RemoveIcon /></IconButton>
            <Typography>Cantidad:</Typography>
          </Box>
        </CardActions>
      </Card>
    </form>
  );
}

export default ProductItem;
