import { useState, useEffect } from 'react';
import  {getProducts} from './api/api';
import {Product} from './shared/shareddtypes';
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
import HomeNavBar from './components/HomeNavBar';

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
        <Route path="/registro" element={<Navigate to="/register" />}/>
        <Route path="/productos" element={<Navigate to="/products" />}/>
        <Route path="/" element={
          <div>
            <HomeNavBar/>
            <Home products ={products}/>
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
            <Products/>
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
            <ListaPedidos/>
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