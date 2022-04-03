import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import accounting from "accounting";
import {Product} from '../../shared/shareddtypes';
import { Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';

type ProductProp = {
  product: Product;
  cantidadItem: number;
}

// const handleDeleteAllCart = async (e: React.FormEvent<HTMLFormElement>) => {
//   e.preventDefault();
//   await deleteAllCart(productProp.product);
// }

// const handleDeleteItemFromCart = async () => {
//   e.preventDefault();
//   await deleteItemFromCart(productProp.product);
// }

// const handleDeleteUnitFromCart = async (e: React.FormEvent<HTMLFormElement>) => {
//   e.preventDefault();
//   await deleteUnitFromCart(productProp.product, 1);
// }


const CarritoItem: React.FC<ProductProp>=(productProp : ProductProp) =>{
  const [cantidad, setCantidad] = useState(productProp.cantidadItem);
  const [producto, setProducto] = useState(productProp.product);

  function handleDeleteItemFromCart(product:Product):void{
    var value = sessionStorage.getItem(product._id);
      if (value != null){
        sessionStorage.removeItem(product._id);
        var e = document.getElementById(product.nombre);
        if(e!=null)
          e.remove();
      }
  }
  
  function handleDeleteUnitFromCart(product:Product):void{
    var value = sessionStorage.getItem(product._id);
      if (value != null){
        var temp = JSON.parse(value);
        if (temp.qty > 1){
          temp.qty = temp.qty - 1;
          sessionStorage.setItem(product._id, JSON.stringify(temp));
          var c = cantidad;
          c=c-1;
          setCantidad(c);
        }
      }
  }
  
  function handleAddUnitFromCart(product:Product):void{
    var value = sessionStorage.getItem(product._id);
      if (value != null){
        var temp = JSON.parse(value);
        if(temp.qty<10){
          temp.qty = temp.qty + 1;
          sessionStorage.setItem(product._id, JSON.stringify(temp));
          var c = cantidad;
          c=c+1;
          setCantidad(c);
        }
      }
  }

  return (
    <Card id={producto.nombre} sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt={producto.nombre}
        height="140"
        image={producto.foto}
      />
      <CardContent sx={{paddingBottom:0}}>   
        <Typography gutterBottom variant="h5" component="div">
        {producto.nombre}
        </Typography>
      </CardContent>
      <CardActions sx={{flexDirection:"row-reverse", justifyContent:'space-between', paddingTop:0}}>
      <Box sx={{display:'flex', flexDirection:"row-reverse", alignItems:'center'}}>
          <IconButton onClick={()=>handleDeleteItemFromCart(producto)}>
              <DeleteIcon />
          </IconButton>
          <IconButton onClick={()=>handleAddUnitFromCart(producto)}>
              <AddIcon />
          </IconButton>
          <IconButton onClick={()=>handleDeleteUnitFromCart(producto)}>
              <RemoveIcon />
          </IconButton>
          <Typography sx={{fontSize:20}}> {accounting.formatMoney(producto.precio *cantidad,"€")}</Typography>
        </Box>
        <Box sx={{display:'flex', flexDirection:"row-reverse", alignItems:'center'}}>
          <Typography>
            {cantidad}
          </Typography>
        </Box>
      </CardActions>
    </Card>
  );
}

export default CarritoItem;
