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
import Pago from './components/pago/Pago';

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