
import { render, screen } from '@testing-library/react';
import products from './mockData.json';
import accounting from 'accounting';
import Carrito from '../components/carrito/Carrito';
import { addToCart } from '../api/api';
import { BrowserRouter } from 'react-router-dom';
import ResumenPedido from '../components/pedidos/ResumenPedido';

test('Carrito', () => {
  let email = "adrian@email.com";
  let contraseña = "1234";
  sessionStorage.setItem("usuario", JSON.stringify({ email: email, esAdmin: false, webId: "" }));
    products.productos.forEach(element=>{
      addToCart(element,5);
    })
    
   // render(<BrowserRouter><ResumenPedido/></BrowserRouter>);
    let text = screen.getByText(/Resumen total del pedido/);
    expect(text).toBeInTheDocument();
    text = screen.getByText("Total (€)");
    expect(text).toBeInTheDocument();
    text = screen.getByText(/Subtotal/);
    expect(text).toBeInTheDocument();
    text = screen.getByText(/Gasto de envio/);
    expect(text).toBeInTheDocument();
    text = screen.getByText(/IVA/);
    expect(text).toBeInTheDocument();
    text = screen.getByText(/Cantidad/);
    expect(text).toBeInTheDocument();
    text = screen.getByText("Precio/u");
    expect(text).toBeInTheDocument();
    text = screen.getByText(/4 %/);
    expect(text).toBeInTheDocument();
    text = screen.getByText(/Finalizar/);
    expect(text).toBeInTheDocument();
    //Probamos que salen todos los productos
    products.productos.forEach(element => {
      let Element = screen.getByText(element.nombre);
      expect(Element).toBeInTheDocument();
      Element = screen.getByText(element.precio*5);
      expect(Element).toBeInTheDocument();
  });

  


});


