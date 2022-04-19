import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from '../components/login/Login';
import { MemoryRouter } from 'react-router-dom';

test('Login', () => {
    render(<MemoryRouter><Login/></MemoryRouter>);
    let text = screen.getByText(/Inicia sesión/);
    expect(text).toBeInTheDocument();
    
    // formulario
    text = screen.getByLabelText(/Email/);
    expect(text).toBeVisible();
    text = screen.getByLabelText(/Contraseña/);
    expect(text).toBeVisible();

    // botones
    text = screen.getByText(/Iniciar sesión/);
    expect(text).toBeInTheDocument();
    text = screen.getByText(/Registrarse/);
    expect(text).toBeInTheDocument();
    text = screen.getByText(/Código fuente/);
    expect(text).toBeInTheDocument();
});