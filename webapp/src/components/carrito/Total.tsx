import { Button } from "@mui/material";
import accounting from "accounting";
import React from "react";
import "./Carrito.css"


type ProductProps = {
    total: number;
  }

function deleteCart(){
    var msg ="¿Seguro de que quieres eliminar todos los productos del carrito?"
    var opcion=window.confirm(msg);
    
}
  
const Total: React.FC<ProductProps>= (productos:ProductProps) => {
    return(
        <div className="root">
            <h2>Total: {accounting.formatMoney(productos.total,"€")}</h2>
            <Button onClick={()=>deleteCart()} variant="contained">Pagar</Button>
        </div>
    )
}

export default Total;