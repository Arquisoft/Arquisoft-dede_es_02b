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

type ProductProp = {
  product: Product;
  cantidadItem: number;
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
          <IconButton>
              <DeleteIcon />
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
