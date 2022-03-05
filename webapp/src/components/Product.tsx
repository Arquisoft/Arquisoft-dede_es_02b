import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { AddShoppingCart} from '@mui/icons-material';
import accounting from "accounting";

export default function Product() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="manzanas"
        height="140"
        image="https://i.ibb.co/Q8ZznpP/manzanas.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Manzanas
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manzanas procedentes del Valle del Ebro
        </Typography>
      </CardContent>
      <CardActions sx={{flexDirection:"row-reverse"}}>
        <IconButton>
            <AddShoppingCart />
        </IconButton>
        <Typography sx={{fontSize:20}}> {accounting.formatMoney(3,"€")}</Typography>
      </CardActions>
    </Card>
  );
}
