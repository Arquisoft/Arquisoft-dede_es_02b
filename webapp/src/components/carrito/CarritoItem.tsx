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

type ProductProp = {
  product: Product;
  cantidadItem: number;
  borrar: Function;
  add: Function;
  delete: Function;
}

const CarritoItem: React.FC<ProductProp>=(productProp : ProductProp) =>{
  

  function handleDeleteItemFromCart(product:Product):void{
    var msg ="¿Seguro de que quieres eliminar "+ product.nombre +" del carrito?"
    var opcion=window.confirm(msg);
    if(opcion){
      productProp.borrar(product);
    }
  }
  
  function handleDeleteUnitFromCart(product:Product):void{
      productProp.delete(product);
  }
  
  function handleAddUnitFromCart(product:Product):void{
      productProp.add(product);
  }



  return (
    <Card aria-label={productProp.product.nombre} id={productProp.product.nombre} sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt={productProp.product.nombre}
        height="140"
        image={productProp.product.foto}
      />
      <CardContent sx={{paddingBottom:0}}>   
        <Typography gutterBottom variant="h5" component="div">
        {productProp.product.nombre}
        </Typography>
      </CardContent>
      <CardActions sx={{flexDirection:"row-reverse", justifyContent:'space-between', paddingTop:0}}>
      <Box sx={{display:'flex', flexDirection:"row-reverse", alignItems:'center'}}>
          <IconButton id={"decrease_" + productProp.product.nombre} aria-label='delete-item' onClick={()=>handleDeleteItemFromCart(productProp.product)}>
              <DeleteIcon />
          </IconButton>
          <IconButton id={"add_" + productProp.product.nombre} aria-label='add-item' onClick={()=>handleAddUnitFromCart(productProp.product)}>
              <AddIcon />
          </IconButton>
          <IconButton id={"removeAll_" + productProp.product.nombre} aria-label='subtract-item' onClick={()=>handleDeleteUnitFromCart(productProp.product)}>
              <RemoveIcon />
          </IconButton>
          <Typography sx={{fontSize:20}}> {accounting.formatMoney(productProp.product.precio *productProp.cantidadItem,"€")}</Typography>
        </Box>
        <Box sx={{display:'flex', flexDirection:"row-reverse", alignItems:'center'}}>
          <Typography>
            {productProp.cantidadItem}
          </Typography>
        </Box>
      </CardActions>
    </Card>
  );
}

export default CarritoItem;
