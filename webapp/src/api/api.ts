import {LoginData, User, Product} from '../shared/shareddtypes';

export async function addUser(user:User):Promise<boolean>{
    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000'
    let response = await fetch(apiEndPoint+'/users/add', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({'name':user.name, 'email':user.email, 'contraseña':user.password, 'dni':user.dni})
      });
    if (response.status===200)
      return true;
    else
      return false;
}

export async function getUsers():Promise<User[]>{
    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000'
    let response = await fetch(apiEndPoint+'/users/list');
    //The objects returned by the api are directly convertible to User objects
    return response.json()
}

export async function addProduct(product:Product):Promise<boolean>{
  const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000'
  let response = await fetch(apiEndPoint+'/users/add', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({'nombre':product.nombre, 'origen':product.origen, 'descripcion':product.descripcion, 'precio':product.precio})
    });
  if (response.status===200)
    return true;
  else
    return false;
}

export async function getProducts():Promise<Product[]>{
  const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000'
  let response = await fetch(apiEndPoint+'/products/list');
  //The objects returned by the api are directly convertible to User objects
  return response.json()
}

export async function login(user:LoginData):Promise<boolean>{
  const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000'
  let response = await fetch(apiEndPoint+'/users/login', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({'email':user.email, 'contraseña':user.password})
    });
  if (response.status===200)
    return true;
  else
    return false;
}