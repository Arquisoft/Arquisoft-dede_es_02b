
import React from 'react';
import { render, screen } from '@testing-library/react';
import Register from '../components/login/Register';

test('Register', () => {
    render(<Register/>);
    let text = screen.getByText(/Registrarse/);
    expect(text).toBeInTheDocument();
    
    // formulario
    text = screen.getByLabelText(/Nombre/);
    expect(text).toBeVisible();
    text = screen.getByLabelText(/DNI/);
    expect(text).toBeVisible();
    text = screen.getByLabelText(/Email/);
    expect(text).toBeVisible();
    text = screen.getByLabelText(/Contraseña/);
    expect(text).toBeVisible();

    // botones
    text = screen.getByText(/Completar registro/);
    expect(text).toBeInTheDocument();
    text = screen.getByText(/Iniciar sesión/);
    expect(text).toBeInTheDocument();
});