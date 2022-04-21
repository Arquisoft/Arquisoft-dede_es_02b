import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Product } from '../shared/shareddtypes';
import logo from "./logo.png"

type ProductProp = {
    product: Product;
  }

export default function ActionAreaCard(productProp : ProductProp) {
  return (
    <Card id="product" sx={{ maxWidth: 400 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={productProp.product.foto}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {productProp.product.nombre} - {productProp.product.precio}€
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
