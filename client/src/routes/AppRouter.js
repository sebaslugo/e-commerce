import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import Home from '../components/Home/home';
import Header from '../components/Header';
import Producto from '../components/Producto/producto';
import Results from '../components/ProductSearch/ResultsSearch';
import Admin from '../components/Admin/Admin';
import ProducList from '../components/Admin/ProducList';
import FormCategories from '../components/Admin/FormCategories';
import Orden from '../components/Admin/Orden';
import OrderList from '../components/Admin/OrderList';
import ShoppingCart from '../components/Carrito/ShoppingCart';
import UserLogin from '../components/User/LoginUser';
import CreateUser from '../components/User/CreateUser';
import CheckUser from '../components/User/CheckUser';
import { getUser } from '../redux/actions/menuLogIn';
import ForgotPassword from '../components/User/ForgotPassword';
import ChangePassword from '../components/User/ChangePassword';
import CheckLogin from '../components/User/Checklogin'
import Inicio from '../components/Inicio'
import Checkout from '../components/Carrito/Checkout'
import Dashboard from '../pages/Dashboard';
import UsersList from '../components/Admin/UsersList';
import PerfilUser from '../components/User/PerfilUser';
import store from '../redux/store/index'

export const AppRouter = () => {

    const dispatch = useDispatch();
    const rol = localStorage.getItem('rol');
    const statusToken = localStorage.getItem('statusToken');
    const id = localStorage.getItem('idUser')
    // const [carrito, setCarrito] = useState(false)


    // useEffect(() => {
    //     dispatch(getUser());
    //     store.subscribe(() => setCarrito(store.getState().shoppingCart.data ? true: false))
    // });

    return (
        <Router>
            <div> 
                <Route   exact path = '/' component = {Inicio}/>
                <Route   exact path = '/:Category' component = {Inicio}/>

                <Route path ='/:category' component={Header}/> 

                <Switch>
                    <Route exact path="/:category" component={Home}/>                    
                    <Route exact path="/producto/:id" component={Producto} />
                    <Route exact path="/search/results" component={Results} />
                    <Route exact path={`/user/cart/${id}`} component={ShoppingCart} />
                    <Route exact path="/checkuser/auth/:id/:token" component={CheckUser} />
                    <Route exact path="/checkuser/auth/login" component={CheckLogin}/>
                
                    <Route exact path= {`/user/perfil/${id}`} component={PerfilUser}/>
                    <Route exact path={`/user/cart/${id}/checkout/`} component={Checkout} isAuthenticated={statusToken} />
               

                    <PrivateRoute exact path="/admin/panel" component={Dashboard} isAuthenticated={statusToken} isAdmin={rol} />
                    <PrivateRoute exact path="/admin/products" component={ProducList} isAuthenticated={statusToken} isAdmin={rol} />
                    <PrivateRoute exact path="/admin/categories" component={FormCategories} isAuthenticated={statusToken} isAdmin={rol} />
                    <PrivateRoute exact path="/admin/order/:id" component={Orden} isAuthenticated={statusToken} isAdmin={rol} />
                    <PrivateRoute exact path="/admin/orderlist" component={OrderList} isAuthenticated={statusToken} isAdmin={rol} />
                    <PrivateRoute exact path="/admin/users" component={UsersList} isAuthenticated={statusToken} isAdmin={rol} />

                    <Route exact path={`/login/changepass/:passwordToken`} component={ChangePassword} isAuthenticated={statusToken} />
                    <PublicRoute exact path="/login/forgot" component={ForgotPassword} isAuthenticated={statusToken} />
                    <PublicRoute exact path="/login/loginuser" component={UserLogin} isAuthenticated={statusToken} />
                    <PublicRoute exact path="/login/createuser" component={CreateUser} isAuthenticated={statusToken} />

                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    )
}
