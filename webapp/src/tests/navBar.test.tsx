import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AñadirProducto from '../components/product/AñadirProducto';
import NavBar from '../components/NavBar';

test('NavBar(Admin)', () => {
    let email = "pedro@email.com";
    sessionStorage.setItem("usuario", JSON.stringify({ email: email, esAdmin: true, webId: "" }));
    render(<MemoryRouter><NavBar/></MemoryRouter>);
    let element = screen.getByLabelText(/Productos/);
    expect(element).toBeVisible();
    element = screen.getByLabelText(/Pedidos/);
    expect(element).toBeVisible();
    element = screen.getByLabelText(/Usuarios/);
    expect(element).toBeVisible();
    

});

test('NavBar(Usuario)', () => {
    let email = "pedro@email.com";
    sessionStorage.setItem("usuario", JSON.stringify({ email: email, esAdmin: false, webId: "" }));
    render(<MemoryRouter><NavBar/></MemoryRouter>);
    let element = screen.getByLabelText(/Productos/);
    expect(element).toBeVisible();
    element = screen.getByLabelText(/Pedidos/);
    expect(element).toBeVisible();
    let elements = screen.getAllByLabelText(/Carrito/);
    elements.forEach(element => {
        expect(element).toBeVisible();
    });

});