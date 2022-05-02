import { render, screen } from '@testing-library/react';
import { Pedido, Estado } from '../shared/shareddtypes';
import datos from './mockData.json';
import ListaPedidos, { pedidosTest } from '../components/pedidos/ListaPedidos';

test('Pedidos', () => {
    let email = "adrian@email.com";
    sessionStorage.setItem("usuario", JSON.stringify({ email: email, esAdmin: true, webId: "" }));
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
        tarjeta: order.tarjeta,
        fecha: order.fecha,
        numero_pedido: order.numero_pedido,
        id_usuario: order.id_usuario,
        precio_total: order.precio_total,
        estado: e
    };

    pedidosTest(pedido);
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
    
    function parseFecha(fecha: string): string {
        let date: string[] = fecha.split('T');
        let hora: string[] = date[1].split(':');
        let result: string = date[0] + " " + hora[0] + ":" + hora[1];
        return result;
      }

    let Element = screen.getByText(pedido.numero_pedido);
    expect(Element).toBeInTheDocument();
    Element = screen.getByText(pedido.estado);
    expect(Element).toBeInTheDocument();
    Element = screen.getByText(pedido.direccion.calle + ", " + pedido.direccion.localidad + ", " + pedido.direccion.provincia + ", " + pedido.direccion.pais + ", " + pedido.direccion.codigo_postal);
    expect(Element).toBeInTheDocument();
    Element = screen.getByText(parseFecha(pedido.fecha));
    expect(Element).toBeInTheDocument();
    Element = screen.getByText(pedido.precio_total);
    expect(Element).toBeInTheDocument();
    Element = screen.getByLabelText(/edit-button/);
    expect(Element).toBeInTheDocument();

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