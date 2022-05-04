import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AñadirProducto, { setTestAdminAñadirProducto } from '../components/product/AñadirProducto';

test('Añadir Productos', () => {
    let email = "pedro@email.com";
    sessionStorage.setItem("usuario", JSON.stringify({ email: email, esAdmin: true, webId: "" }));
    setTestAdminAñadirProducto(true);
    render(<MemoryRouter><AñadirProducto/></MemoryRouter>);
    let text = screen.getByText(/Añadir Producto/);
    expect(text).toBeInTheDocument();

    // formulario
    let element = screen.getByLabelText(/Nombre del Producto/);
    expect(element).toBeVisible();
    element = screen.getByLabelText(/Origen/);
    expect(element).toBeVisible();
    element = screen.getByLabelText(/Precio/);
    expect(element).toBeVisible();
    element = screen.getByLabelText(/Foto/);
    expect(element).toBeVisible();
    element = screen.getByLabelText(/Descripcion/);
    expect(element).toBeVisible();
    // botones
    element = screen.getByLabelText(/Añadir/);
    expect(element).toBeInTheDocument();
});