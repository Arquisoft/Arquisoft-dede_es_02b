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
import Error404 from './components/error/Error404';
import EditarUsuario from './components/usuario/EditarUsuario';
import ListaUsuarios from './components/usuario/ListaUsuarios';
import Pago from './components/pago/Pago';

function App(): JSX.Element {

  return (
    <>
      <Routes>
        <Route path="/registro" element={<Navigate to="/register" />}/>
        <Route path="/productos" element={<Navigate to="/products" />}/>
        <Route path="/" element={
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
        <Route path="/users" element={
          <div>
            <NavBar/>
            <ListaUsuarios/>
          </div>
        }/>

        <Route path="/pago" element={
          <div>
            <NavBar/>
            <Pago/>
          </div>
        }/>

        <Route path="/editUser" element={
          <div>
            <NavBar/>
            <EditarUsuario/>
          </div>
        }/> 
        <Route path="*" element={
          <div>
            <NavBar/>
            <Error404/>
          </div>
        }/>
      </Routes>
    </>
  );
}

export default App;