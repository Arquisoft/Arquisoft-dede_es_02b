import React, { useState, useEffect } from 'react';
import  {getProducts, getPedidos} from './api/api';
import {Product, Pedido} from './shared/shareddtypes';
import './App.css';
import NavBar from './components/NavBar';
import Products from './components/product/Products';
import { Routes, Route, Navigate } from "react-router-dom";
import LoginScreen from './components/login/LoginScreen';
import Carrito from './components/carrito/Carrito';
import RegisterScreen from './components/login/RegisterScreen';
import ListaPedidos from './components/pedidos/ListaPedidos';

function App(): JSX.Element {

  const [products,setProducts] = useState<Product[]>([]);
  const [pedidos,setPedidos] = useState<Pedido[]>([]);

  const refreshProductList = async () => {
    setProducts(await getProducts());
  }

  
const refreshPedidosList = async () => {
  setPedidos(await getPedidos());
}

  useEffect(()=>{
    refreshProductList();
    refreshPedidosList();
  },[]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />}/>
        <Route path="/registro" element={<Navigate to="/register" />}/>
        <Route path="/productos" element={<Navigate to="/products" />}/>
        <Route path="/login" element={
          <LoginScreen/>
        }/>
        <Route path="/register" element={
          <RegisterScreen/>
        }/>
        <Route path="/products" element={
          <div>
            <NavBar/>
            <Products products ={products}/>
          </div>
        }/> 
        <Route path="/carrito" element={
          <div>
            <NavBar/>
            <Carrito products ={products}/>
          </div>
        }/> 
        <Route path="/pedidos" element={
          <div>
            <NavBar/>
            <ListaPedidos pedidos={pedidos}/>
          </div>
        }/> 

      </Routes>
    </>
  );
}

export default App;