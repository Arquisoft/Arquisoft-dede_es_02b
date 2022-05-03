import { LoginData, User, Product, Pedido } from '../shared/shareddtypes';

export async function addUser(user: User): Promise<boolean> {
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000'

  let response = await fetch(apiEndPoint + '/users/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 'nombre': user.nombre, 'apellidos': user.apellidos, 'email': user.email, 'contraseña': user.contraseña, 'dni': user.dni, 'idSolid': user.idSolid, 'foto': user.foto })
  });

  if (response.status === 200) {
    let u: User = await response.json();
    sessionStorage.setItem("usuario", JSON.stringify({ email: u.email, esAdmin: u.esAdmin, webId: u.idSolid, foto: u.foto }));
    return true;
  }
  return false;
}

export async function getUsers(): Promise<User[]> {
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000'
  let response: Response = await fetch(apiEndPoint + '/users/list');

  return response.json()
}

export async function addProduct(product: Product): Promise<boolean> {
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000'
  let response = await fetch(apiEndPoint + '/products/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 'nombre': product.nombre, 'origen': product.origen, 'descripcion': product.descripcion, 'precio': product.precio, 'foto': product.foto })
  });
  if (response.status === 200) {
    return true;
  } else
    return false;
}

export async function getProducts(): Promise<Product[]> {
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000'
  let response = await fetch(apiEndPoint + '/products/list');
  //The objects returned by the api are directly convertible to User objects
  return response.json()
}

export async function login(user: LoginData): Promise<boolean> {
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000'
  let response = await fetch(apiEndPoint + '/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 'email': user.email, 'contraseña': user.contraseña })
  });

  if (response.status === 200) {
    let u: User = await response.json();
    sessionStorage.setItem("usuario", JSON.stringify({ email: u.email, esAdmin: u.esAdmin, webId: u.idSolid, foto: u.foto }));
    return true;
  }
  return false;
}

export function addToCart(product: Product, quantity: number): boolean {
  if (quantity <= 0) {
    quantity = 1;
  }
  var item = {
    'id': product._id,
    'nombre': product.nombre,
    'descripcion': product.descripcion,
    'origen': product.origen,
    'precio': product.precio,
    'foto': product.foto,
    'qty': quantity
  };

  var value = sessionStorage.getItem('producto_' + product._id);
  if (value != null) {
    var temp = JSON.parse(value);
    temp.qty = temp.qty + quantity;
    sessionStorage.setItem('producto_'+product._id, JSON.stringify(temp));

  }
  else {
    sessionStorage.setItem('producto_' + product._id, JSON.stringify(item));
  }

  return true;
}

export async function findProductById(id: string): Promise<Product> {
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000'
  let response = await fetch(apiEndPoint + '/products/id=' + id);
  return response.json();
}

export async function findUserByEmail(email: string): Promise<User> {
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000'
  let response = await fetch(apiEndPoint + '/users/email=' + email);
  return response.json();
}

export async function findUserByDni(dni: string): Promise<User> {
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000'
  let response = await fetch(apiEndPoint + '/users/dni=' + dni);
  return response.json();
}

export async function findUserById(id: string): Promise<User> {
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000'
  let response = await fetch(apiEndPoint + '/users/id=' + id);
  return response.json();
}

export async function addPedido(pedido: Pedido): Promise<boolean> {
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000'
  try {
    await fetch(apiEndPoint + '/pedidos/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "numero_pedido": pedido.numero_pedido,
        "id_usuario": pedido.id_usuario,
        "lista_productos": pedido.lista_productos,
        "precio_total": pedido.precio_total,
        "direccion": pedido.direccion,
        "estado": pedido.estado,
        "tarjeta": pedido.tarjeta
      })
    });

    return true;
  } catch {
    return false;
  }
}

export async function getPedidos(): Promise<Pedido[]> {
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000'
  let response = await fetch(apiEndPoint + '/pedidos/list');
  //The objects returned by the api are directly convertible to User objects
  return response.json()
}

export async function getPedidosByUser(id: string): Promise<Pedido[]> {
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000'
  let response = await fetch(apiEndPoint + '/pedidos/id_usuario=' + id);
  //The objects returned by the api are directly convertible to User objects
  return response.json()
}

export async function editPedido(pedido: Pedido): Promise<boolean> {
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000'
  let response = await fetch(apiEndPoint + '/pedidos/editar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 'numero_pedido': pedido.numero_pedido, 'estado': pedido.estado })
  });
  if (response.status === 200) {
    return true;
  } else
    return false;
}

export async function editUser(user: User): Promise<boolean> {
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000'
  let response = await fetch(apiEndPoint + '/users/editar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 'email': user.email, 'nombre': user.nombre, 'apellidos': user.apellidos, 'idSolid': user.idSolid, 'foto': user.foto})
  });
  if (response.status === 200) {
    let u: User = await response.json();
    sessionStorage.setItem("usuario", JSON.stringify({ email: u.email, esAdmin: u.esAdmin, webId: u.idSolid, foto: u.foto }));
    return true;
  } else
    return false;
}
export async function editProducto(producto: Product): Promise<boolean> {
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000'
  let response = await fetch(apiEndPoint + '/products/editar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ '_id': producto._id, 'nombre': producto.nombre, 'origen': producto.origen, 'precio': producto.precio, 'descripcion': producto.descripcion, 'foto': producto.foto })
  });
  if (response.status === 200) {
    return true;
  } else
    return false;
}

export async function isAdmin(email: string): Promise<boolean> {
  let u: User = await findUserByEmail(email);
  return u.esAdmin;
}

export async function calcularCostesEnvio(address: string): Promise<number> {
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000'
  let temp = JSON.parse(address);
  let addressTo = {
    "name": "Pedido",
    "street1": temp.street1,
    "city": temp.city,
    "state": temp.state,
    "zip": temp.zipcode,
    "country": "ES"
};
  let response = await fetch(apiEndPoint + '/envio/calcular', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(addressTo)
  });
  if (response.ok) {
    let responseJSON = await response.json();
    return responseJSON.coste;
  }
  throw Error("Error al calular los costes");
}

export async function deleteUser(_id: string): Promise<boolean>{
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000'
  let response = await fetch(apiEndPoint + '/users/delete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ '_id': _id })
  });
  if (response.status === 200) {
    return true;
  } else
    return false;
}

export async function getNextNumberPedido(): Promise<number> {
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000'
  let response = await fetch(apiEndPoint + '/pedidos/nextNumber');
  //The objects returned by the api are directly convertible to User objects
  return response.json()
}

export async function getAddressesFromPod(webId: string): Promise<string[]> {
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000'
  let response = await fetch(apiEndPoint + '/solidUser/webId=' + webId);
  //The objects returned by the api are directly convertible to User objects
  return response.json()
}