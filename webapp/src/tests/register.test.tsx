
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RegisterScreen from '../components/login/RegisterScreen';

test('Register', () => {
    render(<MemoryRouter><RegisterScreen/></MemoryRouter>);
    let text = screen.getByText(/Registrarse/);
    expect(text).toBeInTheDocument();
    
    // formulario
    text = screen.getByLabelText(/Nombre/);
    expect(text).toBeVisible();
    text = screen.getByLabelText(/Apellidos/);
    expect(text).toBeVisible();
    text = screen.getByLabelText(/DNI/);
    expect(text).toBeVisible();
    text = screen.getByLabelText(/Email/);
    expect(text).toBeVisible();
    text = screen.getByLabelText(/Contraseña/);
    expect(text).toBeVisible();
    text = screen.getByLabelText(/Foto/);
    expect(text).toBeVisible();
    text = screen.getByLabelText(/Solid WebId/);
    expect(text).toBeVisible();

    // botones
    text = screen.getByText(/Completar registro/);
    expect(text).toBeInTheDocument();
    text = screen.getByText(/Iniciar Sesión/);
    expect(text).toBeInTheDocument();
    text = screen.getByText(/¿No tienes cuenta en SOLID?/);
    expect(text).toBeInTheDocument();
});