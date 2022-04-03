import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { AddShoppingCart} from '@mui/icons-material';
import accounting from "accounting";
import {Product} from '../../shared/shareddtypes';
import { TextField } from '@mui/material';
import { Box } from '@mui/system';
import { addToCart } from '../../api/api';
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

type ProductProp = {
  product: Product;
}

const ProductItem:React.FC<ProductProp>=(productProp : ProductProp) =>{
  const [cantidad, setCantidad] = useState(1);

  const handleAddCart = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addToCart(productProp.product, cantidad);
  }
  function sumarCantidad(n:number){
    var c = cantidad;
    c=c+(1*n);
    if(c<11 && c>0){
      setCantidad(c);
    }
  }

  return (
    <form name="AddItem" onSubmit={handleAddCart}>
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
          <IconButton onClick={()=>sumarCantidad(1)}><AddIcon/></IconButton>
          <TextField
            id="cantidad-producto"
            sx={{
              width:34,
              paddingRight:1,
              paddingLeft:1,
              textAlign:'center',
            }}
            inputProps={{min:1,max:10, style:{textAlign:'center'}}}
            variant="standard"
            defaultValue={1}
            value={cantidad}
            onChange={(e) => {
              setCantidad(parseInt(e.target.value))
            }
            }
          />
          <IconButton onClick={()=>sumarCantidad(-1)}><RemoveIcon/></IconButton>
          <Typography>Cantidad:</Typography>
        </Box>
      </CardActions>
    </Card>
    </form>
  );
}

export default ProductItem;
