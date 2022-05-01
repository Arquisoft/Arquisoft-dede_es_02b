import React, { useEffect, useState } from 'react';
import { render, screen } from '@testing-library/react';
import Products from '../components/product/Products';
import { addProduct, getProducts, login } from '../api/api';
import { Product } from '../shared/shareddtypes';
import products from './mockData.json';
import { BrowserRouter } from 'react-router-dom';
import accounting from 'accounting';
import { Done } from '@mui/icons-material';

/*jest.setTimeout(100000)
beforeAll(async ()=>{
  let producto: Product = {
    _id: '',
    nombre: "manzana reineta",
    origen: "Oviedo",
    precio: 2.00,
    descripcion: "manzana reineta",
    foto: ""
  }
  await addProduct(producto);
})*/

test('Productos', () => {
  
  /*let email = "adrian@email.com";
  sessionStorage.setItem("usuario", JSON.stringify({ email: email, esAdmin: false, webId: "" }));
    render(<BrowserRouter><Products/></BrowserRouter>);
    //Probamos que salen todos los productos
    products.productos.forEach(element => {
      let Element = screen.getByText(element.nombre);
      expect(Element).toBeInTheDocument();
      Element = screen.getByText(element.descripcion);
      expect(Element).toBeInTheDocument();
      Element = screen.getByText(accounting.formatMoney(element.precio,"€"));
      expect(Element).toBeInTheDocument();
  });*/
  let email = "adrian@email.com";
  sessionStorage.setItem("usuario", JSON.stringify({ email: email, esAdmin: false, webId: "" }));
  render(<BrowserRouter><Products/></BrowserRouter>);
  let Element = screen.getByText(/Productos/);
      expect(Element).toBeInTheDocument(); 
});


