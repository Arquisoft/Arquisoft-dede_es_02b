import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import EditarUsuario from '../components/usuario/EditarUsuario';

test('Editar Usuario', () => {
    let email = "adrian@email.com";
    sessionStorage.setItem("usuario", JSON.stringify({ email: email, esAdmin: false, webId: "" }));
    render(<MemoryRouter><EditarUsuario/></MemoryRouter>);
    let text = screen.getByText(/Editar Usuario/);
    expect(text).toBeInTheDocument();
    
    // formulario
    text = screen.getByLabelText(/Nombre/);
    expect(text).toBeVisible();
    text = screen.getByLabelText(/Apellidos/);
    expect(text).toBeVisible();
    text = screen.getByLabelText(/Id de Solid/);
    expect(text).toBeVisible();
    text = screen.getByLabelText(/Foto/);
    expect(text).toBeVisible();

    // botones
    text = screen.getByLabelText(/btEditar/);
    expect(text).toBeInTheDocument();
});