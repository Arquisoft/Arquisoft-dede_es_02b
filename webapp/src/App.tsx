import React, { useState, useEffect } from 'react';
import  {getProducts} from './api/api';
import {Product} from './shared/shareddtypes';
import './App.css';
import NavBar from './components/NavBar';
import Products from './components/product/Products';
import { Routes, Route, Link, Navigate } from "react-router-dom";
import LoginScreen from './components/login/LoginScreen';
import Carrito from './components/carrito/Carrito';
import Total from './components/carrito/Total';

function App(): JSX.Element {

  const [products,setProducts] = useState<Product[]>([]);
  const [logueado, setLogueado] = useState(false);

  const refreshProductList = async () => {
    setProducts(await getProducts());
  }

  useEffect(()=>{
    refreshProductList();
  },[]);

  // Crear un generar token que se guarde en localStorage.
  // Si el token es null sólo permitir entrar en el login y registro 
  // Si el token /= null dejar moverse por la app sin problema, salvo login y registro

  console.log(logueado);
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />}/>
        <Route path="/login" element={
          <LoginScreen setLogueado={setLogueado} logueado={logueado}/>
        }/>
        <Route path="/products" element={
          <div>
            <NavBar setLogueado={setLogueado} logueado={logueado}/>
            <Products products ={products}/>
          </div>
        }/> 

      </Routes>
    </>
  );
}

export default App;