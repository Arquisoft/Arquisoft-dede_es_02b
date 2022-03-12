import React, { useState, useEffect } from 'react';
import  {getProducts} from './api/api';
import {Product} from './shared/shareddtypes';
import './App.css';
import NavBar from './components/NavBar';
import Products from './components/product/Products';
import { Switch, Route, Link, Redirect } from "react-router-dom";
import LoginScreen from './components/login/LoginScreen';
import Carrito from './components/carrito/Carrito';
import Total from './components/carrito/Total';
import Auth from './components/login/Auth';
import RegisterScreen from './components/login/RegisterScreen';

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
        <Route exact path="/" render={()=>{
          return Auth.isAuthenticated() ? 
          <Redirect to="/products"/> 
          : <Redirect to="/login"/> }
        }/>

        <Route path="/login" render={()=>{
          return Auth.isAuthenticated() ? 
          <Redirect to="/products"/> 
          : <LoginScreen/>}
        }/>

        <Route path="/register" render={()=>{
          return Auth.isAuthenticated() ? 
          <Redirect to="/products"/> 
          : <RegisterScreen/>}
        }/>

        <Route path="/products" render={()=>{
          return Auth.isAuthenticated() ? 
          <> 
            <NavBar/>
            <Products products ={products}/>
          </>
          : <Redirect to="/login"/>}
        }/>
        
        <Route path="/carrito" render={()=>{
          return Auth.isAuthenticated() ? 
          <> 
            <NavBar/>
            <Carrito products ={products}/>
            <Total/>
          </>
          : <Redirect to="/login"/>}
        }/>
      </Switch>
    </>
  );
}

export default App;