import React, { useEffect, useState } from 'react';
import { render, screen } from '@testing-library/react';
import Products, { productosTest } from '../components/product/Products';
import { Product } from '../shared/shareddtypes';
import products from './mockData.json';
import { BrowserRouter } from 'react-router-dom';
import accounting from 'accounting';

test('Productos de usuarios', () => {
  let producto: Product = {
    _id: '',
    nombre: "manzana reineta",
    origen: "Oviedo",
    precio: 2.00,
    descripcion: "Manzana reineta de Gijón",
    foto: ""
  }
  productosTest(producto);
  let email = "adrian@email.com";
  sessionStorage.setItem("usuario", JSON.stringify({ email: email, esAdmin: false, webId: "" }));
    render(<BrowserRouter><Products/></BrowserRouter>);
    let Element = screen.getByText(producto.nombre);
    expect(Element).toBeInTheDocument();
    Element = screen.getByText(producto.descripcion);
    expect(Element).toBeInTheDocument();
    Element = screen.getByText("Origen: "+producto.origen);
    expect(Element).toBeInTheDocument();
    Element = screen.getByText(accounting.formatMoney(producto.precio, "€"));
    expect(Element).toBeInTheDocument();
    Element = screen.getByLabelText(/restar-item/);
    expect(Element).toBeInTheDocument();
    Element = screen.getByLabelText(/sumar-item/);
    expect(Element).toBeInTheDocument();
    Element = screen.getByLabelText(/add-item/);
    expect(Element).toBeInTheDocument();
    Element = screen.getByText(/Cantidad:/);
    expect(Element).toBeInTheDocument();
    Element = screen.getByAltText(producto.nombre)
    expect(Element).toBeInTheDocument();
    Element = screen.getByText(/Productos/);
    expect(Element).toBeInTheDocument(); 
});

test('Productos de admin', () => {
  let producto: Product = {
    _id: '',
    nombre: "manzana reineta",
    origen: "Oviedo",
    precio: 2.00,
    descripcion: "Manzana reineta de Gijón",
    foto: ""
  }
  productosTest(producto);
  let email = "adrian@email.com";
  sessionStorage.setItem("usuario", JSON.stringify({ email: email, esAdmin: true, webId: "" }));
    render(<BrowserRouter><Products/></BrowserRouter>);
    let Element = screen.getByText(producto.nombre);
    expect(Element).toBeInTheDocument();
    Element = screen.getByText(producto.descripcion);
    expect(Element).toBeInTheDocument();
    Element = screen.getByText("Origen: "+producto.origen);
    expect(Element).toBeInTheDocument();
    Element = screen.getByLabelText(/delete-item/);
    expect(Element).toBeInTheDocument();
    Element = screen.getByLabelText(/edit-item/);
    expect(Element).toBeInTheDocument();
    Element = screen.getByAltText(producto.nombre)
    expect(Element).toBeInTheDocument();
    Element = screen.getByText(/Productos/);
    expect(Element).toBeInTheDocument(); 
});


