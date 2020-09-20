import React, { useEffect } from 'react';
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
import { getUser } from '../redux/actions/menuLogIn';
import ForgotPassword from '../components/User/ForgotPassword';
import ChangePassword from '../components/User/ChangePassword';

export const AppRouter = () => {

    const dispatch = useDispatch();

    const rol = localStorage.getItem('rol');
    const token = localStorage.getItem('statusToken');
    const id = localStorage.getItem('idUser');

    console.log(rol, token, id);

    useEffect(() => {
        dispatch(getUser());
    });

    return (
        <Router>
            <div>
                <Header />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/:category" component={Home} />
                    <Route exact path="/producto/:id" component={Producto} />
                    <Route exact path="/search/results" component={Results} />
                    <Route exact path={`/user/cart/${id}`} component={ShoppingCart} />


                    <PrivateRoute exact path="/admin/panel" component={Admin} isAuthenticated={token} isAdmin={rol} />
                    <PrivateRoute exact path="/admin/products" component={ProducList} isAuthenticated={token} isAdmin={rol} />
                    <PrivateRoute exact path="/admin/categories" component={FormCategories} isAuthenticated={token} isAdmin={rol} />
                    <PrivateRoute exact path="/admin/order/:id" component={Orden} isAuthenticated={token} isAdmin={rol} />
                    <PrivateRoute exact path="/admin/orderlist" component={OrderList} isAuthenticated={token} isAdmin={rol} />

                    <PublicRoute exact path="/login/changepass" component={ChangePassword} isAuthenticated={token} />
                    <PublicRoute exact path="/login/forgot" component={ForgotPassword} isAuthenticated={token} />
                    <PublicRoute exact path="/login/loginuser" component={UserLogin} isAuthenticated={token} />
                    <PublicRoute exact path="/login/createuser" component={CreateUser} isAuthenticated={token} />


                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    )
}
