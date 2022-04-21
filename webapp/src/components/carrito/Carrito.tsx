import * as React from 'react';
import {Product} from '../../shared/shareddtypes';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ProductComponent from './CarritoItem';
import Split from 'react-split';
import { Alert, IconButton, Snackbar, Typography } from '@mui/material';
import { useState } from 'react';
import Delete from '@mui/icons-material/Delete';
import Total from './Total';
import { ShoppingCart } from '@mui/icons-material';
import { Navigate } from 'react-router-dom';


let cantidad:number = 0;

const Carrito: React.FC= () =>{
  var i = 0;
  let productos: Product[]=[];
  let a = new Map<Product,number>();

  const [carrito, setCarrito] = useState<Map<Product, number>>(a);
  const [productosCarrito, setProductosCarrito] = useState<Product[]>(productos);
  const [producto, setProducto] = useState<null|Product>(null);
  const [open, setOpen] = React.useState(false);

  let usuario: { email: string, esAdmin: boolean } = JSON.parse(sessionStorage.getItem("usuario")!);

  if (usuario.esAdmin) {
      return <Navigate to="/products"></Navigate>
  }

  for (let index = 0; index < sessionStorage.length; index++) {
    const element = sessionStorage.key(index);
    if(element!==null && element!=="usuario"){
      var cartItem = sessionStorage.getItem(element);
      if(cartItem!==null){
        var cartItem2 = JSON.parse(cartItem);    
        cantidad = cartItem2.qty;
        var obj: Product = { _id: element, nombre:cartItem2.nombre, descripcion:cartItem2.descripcion, foto:cartItem2.foto, origen:cartItem2.origen, precio:cartItem2.precio};
        productos.push(obj);
        a.set(obj, cantidad);
      }
    }
  }
  
  function getPrecio():number{
    let precio = 0;
    carrito.forEach((value: number, key: Product) => {
      precio += key.precio * value;
    });
    return precio;
  }

  function borrarItem(product:Product){
    var value = sessionStorage.getItem(product._id);
      if (value !== null){
        sessionStorage.removeItem(product._id);
        let items = [...productosCarrito];
        for (let index = 0; index < items.length; index++) {
          if(items[index]._id===product._id){
            var e = items[index];
            setProducto(e);
            items.splice(index,1);
            carrito.delete(e);
          }
        }
        setProductosCarrito(items); 
      }
      setOpen(true);
  }

  function DeleteUnitFromCart(product:Product):void{
    var value = sessionStorage.getItem(product._id);
      if (value !== null){
        var temp = JSON.parse(value);
        if (temp.qty > 1){
          temp.qty = temp.qty - 1;
          sessionStorage.setItem(product._id, JSON.stringify(temp));
          let items = [...productosCarrito];
          let carrito2 = new Map<Product,number>();
          carrito.forEach((value2: number, key: Product)=>{
              carrito2.set(key,value2);
          });

          for (let index = 0; index < items.length; index++) {
            if(items[index]._id===product._id){
              var e = items[index];
              var c = carrito2.get(e)
              if(typeof c !=="undefined"){
                c=c-1;
                carrito2.set(e,c);
              }
            }
          }
          
          setCarrito(carrito2);
        }
      }
  }
  
  function AddUnitFromCart(product:Product):void{
    var value = sessionStorage.getItem(product._id);
      if (value != null){
        var temp = JSON.parse(value);
        if(temp.qty<10){
          temp.qty = temp.qty + 1;
          sessionStorage.setItem(product._id, JSON.stringify(temp));
          let items = [...productosCarrito];
          let carrito2 = new Map<Product,number>();
          carrito.forEach((value2: number, key: Product)=>{
              carrito2.set(key,value2);
          });
          
          for (let index = 0; index < items.length; index++) {
            if(items[index]._id===product._id){
              var e = items[index];
              var c = carrito2.get(e)
              if(typeof c !=="undefined"){
                c=c+1;
                carrito2.set(e,c);
              }
            }
          }

          setCarrito(carrito2);
        }
      }
  }

  function deleteCart(){
    var msg ="¿Seguro de que quieres eliminar todos los productos del carrito?"
    var opcion=window.confirm(msg);
    if(opcion){
      const items = productosCarrito;
      for(i=0; i<items.length; i++){
        sessionStorage.removeItem(items[i]._id);
      }
      let b = new Map<Product,number>();
      setCarrito(b);
      setProductosCarrito([]);
    }
  }
 

  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Split
      sizes={[75, 25]}
      direction="horizontal"
      cursor="col-resize"
      className="split-flex"
      minSize={[1000, 500]}
    >
      <Snackbar  open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
           {producto?.nombre} borrado del carrito
        </Alert>
      </Snackbar>
      <Box sx={{ flexGrow: 1, padding: 3}}>
      <Typography variant="h1" component="h2" sx={{fontSize:40}}>
          Carrito <ShoppingCart />
        </Typography>
          <Grid container spacing={3} direction="row" justifyContent="center" alignItems="center" marginTop={1}>
            {Array.from(Array(productosCarrito.length)).map((_, index) => (
              <Grid id="carrito-item" item xs={12} sm={7} md={4} lg={3} key={index}>
                <ProductComponent product={productosCarrito[index]} cantidadItem={carrito.get(productosCarrito[index])as number} borrar={borrarItem} add={AddUnitFromCart} delete={DeleteUnitFromCart}/>
              </Grid>
            ))}
          </Grid>
      </Box>
      <Box sx={{ flexGrow: 1, padding: 3}}>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            Resumen del pedido:
          </Typography>
          {Array.from(Array(productosCarrito.length)).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <li>{productosCarrito[index].nombre +" ("+ carrito.get(productosCarrito[index]) + " uds)" +
                    "  -------  "+productosCarrito[index].precio*(carrito.get(productosCarrito[index])as number)+"€"}</li>
            </Grid>
          ))}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ----------------------------
          </Typography>
          <Total total={getPrecio()}/>
          <IconButton onClick={()=>deleteCart()}><Delete/>Borrar pedido</IconButton>
      </Box>
    </Split>
  ); 
}

export default Carrito;