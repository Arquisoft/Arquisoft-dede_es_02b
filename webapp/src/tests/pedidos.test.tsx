import { render, screen } from '@testing-library/react';
import { Pedido, Estado } from '../shared/shareddtypes';
import datos from './mockData.json';
import ListaPedidos from '../components/pedidos/ListaPedidos';

test('Pedidos', () => {
    let email = "adrian@email.com";
    let contraseña = "1234";
    sessionStorage.setItem("usuario", JSON.stringify({ email: email, esAdmin: false, webId: "" }));
    let order = datos.pedidos[0];
    let e = Estado.entregado;
    let pedido: Pedido = {
        _id: order._id,
        direccion: order.direccion,
        lista_productos: [{
            id_producto: order.lista_productos[0].id_producto,
            cantidad: order.lista_productos[0].cantidad,
            precio: order.lista_productos[0].precio
        }],
        fecha: order.fecha,
        numero_pedido: order.numero_pedido,
        id_usuario: order.id_usuario,
        precio_total: order.precio_total,
        estado: e
    };

    let pedidos: Pedido[] = [pedido];
    render(<ListaPedidos />);
    //Probamos que salen todas las columnas
    let text = screen.getByText(/Nº Pedido/);
    expect(text).toBeInTheDocument();
    text = screen.getByText(/Fecha/);
    expect(text).toBeInTheDocument();
    text = screen.getByText(/Total del Pedido/);
    expect(text).toBeInTheDocument();
    text = screen.getByText(/Estado/);
    expect(text).toBeInTheDocument();
    text = screen.getByText(/Cliente/);
    expect(text).toBeInTheDocument();
    text = screen.getByText(/Dirección/);
    expect(text).toBeInTheDocument();
    text = screen.getByText(/Productos/);
    expect(text).toBeInTheDocument();
    text = screen.getByText(/Rows per page:/);
    expect(text).toBeInTheDocument();
    //Probamos que salen todos los pedidos
    pedidos.forEach(element => {
        //let Element = screen.getByText(element.numero_pedido);
        //expect(Element).toBeInTheDocument();
       //let Element = screen.getByText(element.estado);
       // expect(Element).toBeInTheDocument();
       //let Element = screen.getByText(element.fecha);
       // expect(Element).toBeInTheDocument();
    });

    let elements = screen.getByLabelText(/filter-icon/);
    expect(elements).toBeInTheDocument();
    elements.click();
    elements = screen.getByLabelText(/filtrar-button/);
    expect(elements).toBeInTheDocument();
    elements = screen.getByLabelText(/opciones/);
    expect(elements).toBeInTheDocument();
    elements = screen.getByLabelText(/Filtrar/);
    expect(elements).toBeInTheDocument();

});