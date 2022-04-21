import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

test('renders learn react link', () => {
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
});
