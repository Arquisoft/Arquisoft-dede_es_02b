import React from 'react';
import { render, screen } from '@testing-library/react';
import LoginScreen from '../components/login/LoginScreen';

test('Login screen', () => {
    render(<LoginScreen/>);
    let text = screen.getByText(/DeDe/);
    expect(text).toBeInTheDocument();
    text = screen.getByText(/Inicia sesión/);
    expect(text).toBeInTheDocument();
});