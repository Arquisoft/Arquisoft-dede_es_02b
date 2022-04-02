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

function handleDeleteItemFromCart(product:Product):void{
  var value = sessionStorage.getItem(product._id);
    if (value != null){
      sessionStorage.removeItem(product._id);
    }
}

function handleDeleteUnitFromCart(product:Product):void{
  var value = sessionStorage.getItem(product._id);
    if (value != null){
      var temp = JSON.parse(value);
      if (temp.qty > 1){
        temp.qty = temp.qty - 1;
        sessionStorage.setItem(product._id, JSON.stringify(temp));
      }
    }
}

function handleAddUnitFromCart(product:Product):void{
  var value = sessionStorage.getItem(product._id);
    if (value != null){
      var temp = JSON.parse(value);
      temp.qty = temp.qty + 1;
      sessionStorage.setItem(product._id, JSON.stringify(temp));
    }
}

const CarritoItem: React.FC<ProductProp>=(productProp : ProductProp) =>{
  return (
    <Card sx={{ maxWidth: 345 }}>
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
          <IconButton onClick={()=>handleDeleteItemFromCart(productProp.product)}>
              <DeleteIcon />
          </IconButton>
          <IconButton onClick={()=>handleAddUnitFromCart(productProp.product)}>
              <AddIcon />
          </IconButton>
          <IconButton onClick={()=>handleDeleteUnitFromCart(productProp.product)}>
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
