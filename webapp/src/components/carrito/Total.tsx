import { Button } from "@mui/material";
import accounting from "accounting";
import React, { useEffect } from "react";
import "./Carrito.css"
import { Link } from 'react-router-dom';
import { useState } from "react";

type Price = {
  price: number;
}
  
const Total: React.FC<Price>= (total: Price) => {
  const [botonPagarActivo, setPagar] = useState(false);

  function ConditionalLink(){
    setPagar(total.price>0);
    if (botonPagarActivo){
      return <Link to={"/pago"}>
              <Button variant="contained" type="button" disabled={!botonPagarActivo}>Pagar</Button>
            </Link>
    } else {
      return <>
              <Button variant="contained" type="button" disabled={!botonPagarActivo}>Pagar</Button>
            </>
    };
  }

  return(
      <div className="root">
          <h2>Total: {accounting.formatMoney(total.price,"€")}</h2>
          <ConditionalLink/>
      </div>
  )
}

export default Total;