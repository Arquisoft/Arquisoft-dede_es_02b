import { nextTick } from 'process';
import { LoginData, User, Product } from '../shared/shareddtypes';

export async function addUser(user: User): Promise<boolean> {
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000'
  try {
    await fetch(apiEndPoint + '/users/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'nombre': user.nombre, 'email': user.email, 'contraseña': user.contraseña, 'dni': user.dni })
    }).then(handleExceptions);

    sessionStorage.setItem("emailUsuario", user.email);
    return true;
  } catch {
    return false;
  }
}

export async function getUsers(): Promise<User[]> {
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000'
  let response = await fetch(apiEndPoint + '/users/list');

  return response.json()
}

export async function addProduct(product: Product): Promise<boolean> {
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000'
  let response = await fetch(apiEndPoint + '/users/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 'nombre': product.nombre, 'origen': product.origen, 'descripcion': product.descripcion, 'precio': product.precio })
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
  try {
    await fetch(apiEndPoint + '/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'email': user.email, 'contraseña': user.contraseña })
    }).then(handleExceptions);

    sessionStorage.setItem("emailUsuario", user.email);
    return true;
  } catch {
    return false;
  }
}

export async function addToCart(product: Product, quantity: number): Promise<boolean> {
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000'
  let response = await fetch(apiEndPoint + '/cart/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      'id': product._id,
      'qty': quantity
    })
  });

  if (response.status === 200) {
    var value = sessionStorage.getItem(product._id);
    if (value != null) {
      var actual = Number.parseInt(value) + quantity;
      sessionStorage.setItem(product._id, actual.toString());
    }
    else {
      sessionStorage.setItem(product._id, quantity.toString());
    }

    return true;
  }
  else {
    return false;
  }

}

export async function findProductById(id: string): Promise<Product> {
  const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000'
  let response = await fetch(apiEndPoint + '/products/' + id);
  return response.json();
}

function handleExceptions(response: Response): Response {
  if (response.ok) {
    return response;
  } else {
    throw new Error("Algo ha fallado");
  }
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