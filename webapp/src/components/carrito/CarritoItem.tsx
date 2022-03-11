import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import accounting from "accounting";
import {Product} from '../../shared/shareddtypes';
import { idText } from 'typescript';
import { Box, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

type ProductProp = {
  product: Product;
}

export default function CarritoItem(productProp : ProductProp) {
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
          <IconButton>
              <DeleteIcon />
          </IconButton>
          <Typography sx={{fontSize:20}}> {accounting.formatMoney(productProp.product.precio,"€")}</Typography>
        </Box>
        <Box sx={{display:'flex', flexDirection:"row-reverse", alignItems:'center'}}>
          <Typography>Cantidad: 1</Typography>
        </Box>
      </CardActions>
    </Card>
  );
}
