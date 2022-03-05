import React, { useState, useEffect } from 'react';
import  {getProducts} from './api/api';
import {Product} from './shared/shareddtypes';
import './App.css';
import HomeNavBar from './components/HomeNavBar';
import Login from './components/Login';

function App(): JSX.Element {

  const [products,setProducts] = useState<Product[]>([]);

  const refreshProductList = async () => {
    setProducts(await getProducts());
  }

  useEffect(()=>{
    refreshProductList();
  },[]);

  return (
    <>
<<<<<<< HEAD
      <HomeNavBar/>
      <Login/>
=======
      <NavBar/>
      <Products products ={products}/>
      
>>>>>>> Develop
    </>
  );
}

export default App;
