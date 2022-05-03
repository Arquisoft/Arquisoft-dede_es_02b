import { Button } from "@mui/material";
import accounting from "accounting";
import React, { useEffect } from "react";
import "./Carrito.css"
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

type Price = {
  price: number;
}
  
const Total: React.FC<Price>= (total: Price) => {
  const [botonPagarActivo, setPagar] = useState(total.price>0);
  const navigate = useNavigate(); 

  useEffect(()=>{
    setPagar(total.price>0);
  }, [total.price]);

  function handleClick(){
    if (botonPagarActivo){
      navigate("/pago");
    }
  }

  return(
      <div className="root">
          <h2>Total: {accounting.formatMoney(total.price,"€")}</h2>
          <Button variant="contained" type="button" disabled={!botonPagarActivo} onClick={handleClick}>Pagar</Button>
      </div>
  )
}

export default Total;