import React, { useEffect, useState } from 'react';
import { render, screen } from '@testing-library/react';
import Products from '../components/product/Products';
import { getProducts } from '../api/api';
import { Product } from '../shared/shareddtypes';
import products from './mockData.json';
import { BrowserRouter } from 'react-router-dom';
import accounting from 'accounting';

test('Productos', () => {
    render(<BrowserRouter><Products/></BrowserRouter>);
    //Probamos que salen todos los productos
    products.productos.forEach(element => {
      let Element = screen.getByText(element.nombre);
      expect(Element).toBeInTheDocument();
      Element = screen.getByText(element.descripcion);
      expect(Element).toBeInTheDocument();
      Element = screen.getByText(accounting.formatMoney(element.precio,"€"));
      expect(Element).toBeInTheDocument();
  });
});


