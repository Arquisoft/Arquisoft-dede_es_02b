import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Tarjeta from '../components/pago/Tarjeta';

test('Tarjeta', () => {
    let email = "pedro@email.com";
    sessionStorage.setItem("usuario", JSON.stringify({ email: email, esAdmin: false, webId: "" }));
    render(<MemoryRouter><Tarjeta/></MemoryRouter>);
    let text = screen.getAllByText(/Tarjeta/);
    text.forEach(element => {
        expect(element).toBeInTheDocument();
    });

    
    // formulario
    let element = screen.getByLabelText(/Fecha de caducidad/);
    expect(element).toBeVisible();
    element = screen.getByLabelText(/Número de seguridad/);
    expect(element).toBeVisible();

    // botones
    element = screen.getByText(/Pagar/);
    expect(element).toBeInTheDocument();
});