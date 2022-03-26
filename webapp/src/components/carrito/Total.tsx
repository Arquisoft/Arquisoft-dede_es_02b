import { Button, makeStyles } from "@mui/material";
import accounting from "accounting";
import React from "react";
import Carrito from "./Carrito";
import "./Carrito.css"
import {getPrecio} from "./Carrito"



const Total:React.FC = () => {
    return(
        <div className="root">
            <h2>Total: {accounting.formatMoney(getPrecio(),"€")}</h2>
            <Button variant="contained">Pagar</Button>

        </div>
    )
}

export default Total