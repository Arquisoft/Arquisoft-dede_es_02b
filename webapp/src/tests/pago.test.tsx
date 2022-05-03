import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from '../components/login/Login';
import { MemoryRouter } from 'react-router-dom';
import Pago from '../components/pago/Pago';

test('Pago', () => {
    let email = "pedro@email.com";
    sessionStorage.setItem("usuario", JSON.stringify({ email: email, esAdmin: false, webId: "" }));
    sessionStorage.setItem("prod_", JSON.stringify({ email: email, esAdmin: false, webId: "" }));
    render(<MemoryRouter><Pago/></MemoryRouter>);
    let text = screen.getByText(/Dirección/);
    expect(text).toBeInTheDocument();
    
    // formulario
    text = screen.getByLabelText(/Calle/);
    expect(text).toBeVisible();
    text = screen.getByLabelText(/Localidad/);
    expect(text).toBeVisible();
    text = screen.getByLabelText(/Provincia/);
    expect(text).toBeVisible();
    text = screen.getByLabelText(/País/);
    expect(text).toBeVisible();
    text = screen.getByLabelText(/Código Postal/);
    expect(text).toBeVisible();

    // botones
    text = screen.getByText(/Siguiente/);
    expect(text).toBeInTheDocument();
});