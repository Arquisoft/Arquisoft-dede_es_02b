import React from 'react';
import { render, screen } from '@testing-library/react';
import LoginScreen from '../components/login/LoginScreen';

import { MemoryRouter } from 'react-router-dom';

test('Login screen', () => {
    render(<MemoryRouter><LoginScreen/></MemoryRouter>);
    let text = screen.getByLabelText(/DeDe/);
    expect(text).toBeInTheDocument();
    text = screen.getByText(/Inicia sesión/);
    expect(text).toBeInTheDocument();
});