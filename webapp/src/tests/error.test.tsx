import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import EditarUsuario from '../components/usuario/EditarUsuario';
import Error403 from '../components/error/Error403';
import Error404 from '../components/error/Error404';

test('Error 403', () => {
    render(<MemoryRouter><Error403/></MemoryRouter>);
    let text = screen.getByText(/Error 403 - Prohibido/);
    expect(text).toBeInTheDocument();
    text = screen.getByText(/No tienes permiso para acceder a esta página/);
    expect(text).toBeVisible();
    text = screen.getByLabelText(/imagen/);
    expect(text).toBeVisible();
});
test('Error 404', () => {
    render(<MemoryRouter><Error404/></MemoryRouter>);
    let text = screen.getByText(/Error 404 - Pagina inexistente/);
    expect(text).toBeInTheDocument();
    text = screen.getByText(/Lo sentimos, pero esta página no está disponible/);
    expect(text).toBeVisible();
    text = screen.getByLabelText(/imagen/);
    expect(text).toBeVisible();
    
});