import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import { AddShoppingCart} from '@mui/icons-material';
import accounting from "accounting";
import {Product} from '../../shared/shareddtypes';
import { idText } from 'typescript';
import { TextField } from '@mui/material';
import { Box } from '@mui/system';
import { addToCart } from '../../api/api';
import { useState } from "react";

type ProductProp = {
  product: Product;
}



const ProductItem:React.FC<ProductProp>=(productProp : ProductProp) =>{
  const [cantidad, setCantidad] = useState(1);

  const handleAddCart = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let result:boolean = await addToCart(productProp.product, cantidad);
  }

  return (
    <form name="register" onSubmit={handleAddCart}>
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt={productProp.product.nombre}
        height="140"
        image={productProp.product.foto}
      />
      <CardContent>   
        <Typography gutterBottom variant="h5" component="div">
        {productProp.product.nombre}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {productProp.product.descripcion}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Origen: {productProp.product.origen}
        </Typography>
      </CardContent>
      <CardActions sx={{flexDirection:"row-reverse", justifyContent:'space-between'}}>
        <Box sx={{display:'flex', flexDirection:"row-reverse", alignItems:'center'}}>
          <IconButton type="submit" >
            <AddShoppingCart/> 
          </IconButton>
          <Typography sx={{fontSize:20}}> {accounting.formatMoney(productProp.product.precio,"€")}</Typography>
        </Box>
        <Box sx={{display:'flex', flexDirection:"row-reverse", alignItems:'center'}}>
          <TextField
            id="cantidad-producto"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            sx={{
              width:34,
              paddingRight:1,
              paddingLeft:1,
              textAlign:'center'
            }}
            inputProps={{min:1,max:10, style:{textAlign:'right'}}}
            variant="standard"
            defaultValue={1}
            onChange={(e) => 
              setCantidad(parseInt(e.target.value))
            }
          />
          <Typography>Cantidad:</Typography>
        </Box>
      </CardActions>
    </Card>
    </form>
  );
}

export default ProductItem;
