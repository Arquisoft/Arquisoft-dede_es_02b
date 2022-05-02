import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Product } from './shared/shareddtypes';
import { productosHomeTest } from './components/Home';

test('renders learn react link', () => {
  let producto: Product = {
    _id: '',
    nombre: "manzana reineta",
    origen: "Oviedo",
    precio: 2.00,
    descripcion: "Manzana reineta de Gijón",
    foto: ""
  }
  productosHomeTest(producto);
  render(<BrowserRouter>
    <App />
  </BrowserRouter>);
  var linkElement = screen.getByText(/Bienvenido a DeDe/);
  expect(linkElement).toBeInTheDocument();
  linkElement = screen.getByText(/La tienda Nº1 en la venta de frutas/);
  expect(linkElement).toBeInTheDocument();
  linkElement = screen.getByText(/¿Quienes somos?/);
  expect(linkElement).toBeInTheDocument();
  linkElement = screen.getByText(/Somos el grupo DeDe_es2b, que tiene como objetivo la venta de frutas de forma segura y rápida, además de respetar la privacidad de los clientes./);
  expect(linkElement).toBeInTheDocument();
  linkElement = screen.getByText(/Productos destacados/);
  expect(linkElement).toBeInTheDocument();
  let Element = screen.getByText(producto.nombre+" - "+producto.precio+"€");
    expect(Element).toBeInTheDocument();
    Element = screen.getByAltText(producto.nombre)
    expect(Element).toBeInTheDocument();
});
