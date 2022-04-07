
import { render, screen } from '@testing-library/react';
import products from './mockData.json';
import accounting from 'accounting';
import Carrito from '../components/carrito/Carrito';
import { addToCart } from '../api/api';

test('Carrito', () => {
    products.productos.forEach(element=>{
      addToCart(element,3);
    })
    render(<Carrito/>);
    let text = screen.getByText(/Resumen del pedido/);
    expect(text).toBeInTheDocument();
    text = screen.getByText(/Total/);
    expect(text).toBeInTheDocument();
    text = screen.getByText(/Borrar pedido/);
    expect(text).toBeInTheDocument();
    //Probamos que salen todos los productos
    products.productos.forEach(element => {
      let Element = screen.getByText(element.nombre);
      expect(Element).toBeInTheDocument();
      Element = screen.getByText(accounting.formatMoney(element.precio*3,"€"));
      expect(Element).toBeInTheDocument();
      Element = screen.getByLabelText(element.nombre);
      expect(Element).toBeInTheDocument(); 
  });

  
  let elements = screen.getAllByLabelText(/add-item/);
  expect(elements[0]).toBeInTheDocument();
  //Comprobamos que sumamos
  elements[0].click();
  let Element = screen.getByText(accounting.formatMoney(products.productos[0].precio*4,"€"));
  expect(Element).toBeInTheDocument();

  elements = screen.getAllByLabelText(/subtract-item/);
  expect(elements[0]).toBeInTheDocument(); 
  //Comprobamos que restamos
  elements[0].click();
  Element = screen.getByText(accounting.formatMoney(products.productos[0].precio*3,"€"));
  expect(Element).toBeInTheDocument();

  expect(elements.length).toEqual(products.productos.length);

  elements = screen.getAllByLabelText(/delete-item/);
  expect(elements[0]).toBeInTheDocument();
  expect(elements.length).toEqual(products.productos.length);
  window.confirm = jest.fn(() => true) 
  elements[0].click();
  expect(window.confirm).toHaveBeenCalled();
  expect(elements.length).toEqual(products.productos.length);


});


