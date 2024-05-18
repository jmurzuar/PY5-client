import './App.css';

import Main from './components/Main'
import Product from './components/Product'

import Header from './components/Header';
import Footer from './components/Footer';

import Profile from './components/Profile'

import Catalog from './components/Catalog'


import {
  BrowserRouter as Router,
  Switch
} from 'react-router-dom'

import Login from './components/Login';
import Register from './components/Register';

import ProductState from './context/Product/ProductState';
import UserState from './context/User/UserState';
import VentaState from './context/Venta/VentaState';
import LayoutState from './context/Layout/LayoutState'

import AuthRoute from './components/Routes/AuthRoute';
import PrivateRoute from './components/Routes/PrivateRoute'
import PublicRoute from './components/Routes/PublicRoute';
import { CartProvider } from './context/CarContext';
import { Carro } from './components/Carro';
import { MercadoPago } from './components/MercadoPago';
import SuccessPage from './components/SuccessPage';
import FailPage from './components/FailPage';
import PendingPage from './components/PendingPage';
import CrearVenta from './context/Venta/CrearVenta';
import HistorySales from './components/HistorySales';




function App() {




  return (
    <>
      <CartProvider>
        <LayoutState>
          <ProductState>
            <UserState>
              <VentaState>
              <Router>


                <Header />



                <Switch>

                  {/* RUTAS PRIVADAS */}
                  <PrivateRoute exact path="/perfil" component={Profile} />

                  {/* RUTAS DE AUTENTICACIÓN */}
                  <AuthRoute exact path="/iniciar-sesion" component={Login} />
                  <AuthRoute exact path="/crear-cuenta" component={Register} />

                  {/* RUTAS ESTÁTICAS */}
                  <PublicRoute exact path="/catalogo" component={Catalog} />
                  <PublicRoute exact path="/carrito" component={Carro} />
                  <PublicRoute exact path="/sales" component={HistorySales} />

                  <PublicRoute exact path="/mp" component={MercadoPago} />
                  <PublicRoute exact path="/success" component={SuccessPage} />
                  <PublicRoute exact path="/failure" component={FailPage} />
                  <PublicRoute exact path="/pending" component={PendingPage} />


                  <PublicRoute exact path="/venta" component={CrearVenta} />


                  {/* RUTAS DINÁMICAS */}
                  <PublicRoute exact path="/:productId" component={Product} />

                  {/* RUTA BASE */}
                  <PublicRoute exact path="/" component={Main} />

                </Switch>

                <Footer />

              </Router>
              </VentaState>
            </UserState>
          </ProductState>
        </LayoutState>
      </CartProvider>
    </>
  );
}

export default App;
