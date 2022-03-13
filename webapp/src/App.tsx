import React, { useState, useEffect } from 'react';
import  {getProducts} from './api/api';
import {Product} from './shared/shareddtypes';
import './App.css';
import NavBar from './components/NavBar';
import Products from './components/Products';
import { Routes, Route, Link, Navigate } from "react-router-dom";
import LoginScreen from './components/login/LoginScreen';

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
      <Routes>
        <Route path="/" element={<Navigate to="/login" />}/>
        <Route path="/login" element={
          <LoginScreen/>
        }/>
        <Route path="/products" element={
          <div>
            <NavBar/>
            <Products products ={products}/>
          </div>
        }/> 

      </Routes>
    </>
  );
}

export default App;