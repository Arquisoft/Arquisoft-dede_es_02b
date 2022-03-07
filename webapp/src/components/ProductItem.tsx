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
import {Product} from '../shared/shareddtypes';
import { idText } from 'typescript';
import { TextField } from '@mui/material';

type ProductProp = {
  product: Product;
}

export default function ProductItem(productProp : ProductProp) {
  return (
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
      <CardActions sx={{flexDirection:"row-reverse"}}>
        <IconButton>
            <AddShoppingCart />
        </IconButton>
        <Typography sx={{fontSize:20}}> {accounting.formatMoney(productProp.product.precio,"€")}</Typography>
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
          
        />
        <Typography>Cantidad:</Typography>
      </CardActions>
    </Card>
  );
}
