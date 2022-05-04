import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ListaUsuarios, { setTestAdminListaUsuarios, usuariosTest } from '../components/usuario/ListaUsuarios';
import { User } from '../shared/shareddtypes';

test('Lista de usuarios', () => {
    let usuario:User= {
        _id:'6220e1b3e976d8ae3a9d3e5e',
        nombre: 'Pedro',
        apellidos: 'Zahonero',
        idSolid: 'prueba',
        email: 'pedro@email.com',
        contraseña: '1234',
        dni: '12345678P',
        esAdmin: false,
        foto: ''
    }
    usuariosTest(usuario)
    setTestAdminListaUsuarios(true);
    let email = "pedro@email.com";
    sessionStorage.setItem("usuario", JSON.stringify({ email: email, webId: "" }));
    render(<BrowserRouter><ListaUsuarios/></BrowserRouter>);
    //Probamos que salen todos los productos
    let Element = screen.getByText(/Nombre/);
    expect(Element).toBeInTheDocument();
    Element = screen.getByText(/Apellidos/);
    expect(Element).toBeInTheDocument();
    Element = screen.getByText(/ID Solid/);
    expect(Element).toBeInTheDocument();
    Element = screen.getByText(/Email/);
    expect(Element).toBeInTheDocument();
    Element = screen.getByText(/DNI/);
    expect(Element).toBeInTheDocument();
    Element = screen.getByText("Admin/Cliente");
    expect(Element).toBeInTheDocument();
    Element = screen.getByText(/Eliminar/);
    expect(Element).toBeInTheDocument();
    Element = screen.getByText(/Listado de usuarios/);
    expect(Element).toBeInTheDocument();
    Element = screen.getByText(usuario.nombre);
    expect(Element).toBeInTheDocument();
    Element = screen.getByText(usuario._id);
    expect(Element).toBeInTheDocument();
    Element = screen.getByText(usuario.apellidos);
    expect(Element).toBeInTheDocument();
    Element = screen.getByText(usuario.email);
    expect(Element).toBeInTheDocument();
    Element = screen.getByText(usuario.dni);
    expect(Element).toBeInTheDocument();
    Element = screen.getByText(usuario.idSolid);
    expect(Element).toBeInTheDocument();
    Element = screen.getByLabelText(/delete-icon/);
    expect(Element).toBeInTheDocument();

});

test('Lista de usuarios (intenta acceder un usuario)', () => {
    let usuario:User= {
        _id:'6220e1b3e976d8ae3a9d3e5e',
        nombre: 'Pedro',
        apellidos: 'Zahonero',
        idSolid: '',
        email: 'pedro@email.com',
        contraseña: '1234',
        dni: '12345678P',
        esAdmin: false,
        foto: ''
    }
    usuariosTest(usuario);
    setTestAdminListaUsuarios(false);
    let email = "pedro@email.com";
    sessionStorage.setItem("usuario", JSON.stringify({ email: email, webId: "" }));
    render(<BrowserRouter><ListaUsuarios/></BrowserRouter>);
    let text = screen.getByText(/Error 403 - Prohibido/);
    expect(text).toBeInTheDocument();
    text = screen.getByText(/No tienes permiso para acceder a esta página/);
    expect(text).toBeVisible();
    text = screen.getByLabelText(/imagen/);
    expect(text).toBeVisible();
});



