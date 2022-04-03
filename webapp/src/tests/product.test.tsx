import React, { useEffect, useState } from 'react';
import { render, screen } from '@testing-library/react';
import Products from '../components/product/Products';
import { getProducts } from '../api/api';
import { Product } from '../shared/shareddtypes';
import products from './mockData.json';
import { BrowserRouter } from 'react-router-dom';

test('Productos', () => {
  render(<BrowserRouter><Products products ={products.productos}/></BrowserRouter>);
  products.productos.forEach(element => {
    const linkElement = screen.getByText(element.nombre);
    expect(linkElement).toBeInTheDocument();
  });
});


