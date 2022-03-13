import React, { useState, useEffect } from 'react';
import  {getProducts} from './api/api';
import {Product} from './shared/shareddtypes';
import './App.css';
import NavBar from './components/NavBar';
import Products from './components/product/Products';
import { Switch, Route, Link } from "react-router-dom";
import LoginScreen from './components/login/LoginScreen';
import Carrito from './components/carrito/Carrito';
import Total from './components/carrito/Total';

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
      <Switch>
        <Route exact path="/">
          <LoginScreen/>
        </Route>
        <Route path="/products"> 
          <NavBar/>
          <Products products ={products}/>
        </Route>
        <Route path="/carrito"> 
          <NavBar/>
          <Carrito products ={products}/>
          <Total/>
        </Route>
      </Switch>
    </>
  );
}

export default App;