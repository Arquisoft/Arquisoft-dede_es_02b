import {LoginData, User, Product} from '../shared/shareddtypes';

export async function addUser(user:User):Promise<boolean>{
    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000'
    let response = await fetch(apiEndPoint+'/users/add', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({'name':user.nombre, 'email':user.email, 'contraseña':user.contraseña, 'dni':user.dni})
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
  if (response.status===200){
    return true;
  }else
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
      body: JSON.stringify({'email':user.email, 'contraseña':user.contraseña})
    });

  if (response.status===200){
    localStorage.setItem("emailUsuario", user.email);
    return true;
  }else
    return false;
}

export async function addToCart(product:Product, quantity:number):Promise<boolean>{
  const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000'
  let response = await fetch(apiEndPoint+'/cart/add', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({'id':product._id, 
                            'qty':quantity})
  });
  
  if (response.status===200){
    var value = sessionStorage.getItem(product._id);
    if (value != null){
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