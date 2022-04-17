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
import AñadirProducto from './components/product/AñadirProducto';
import Home from './components/Home';
import HomeNavBar from './components/ButtonAppBar';

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
        <Route path="/" element={<Navigate to="/home" />}/>
        <Route path="/registro" element={<Navigate to="/register" />}/>
        <Route path="/productos" element={<Navigate to="/products" />}/>
        <Route path="/home" element={
          <div>
            <HomeNavBar/>
            <Home/>
          </div>
        }/>
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
            <Carrito/>
          </div>
        }/> 
        <Route path="/pedidos" element={
          <div>
            <NavBar/>
            <ListaPedidos pedidos={pedidos}/>
          </div>
        }/> 
        <Route path="/addProducts" element={
          <div>
            <NavBar/>
            <AñadirProducto/>
          </div>
        }/> 

      </Routes>
    </>
  );
}

export default App;