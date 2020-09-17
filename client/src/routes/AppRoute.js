import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import Home from '../components/Home/home';
import Admin from '../components/Admin/Admin';

export const AppRoute = () => {

    const { user } = useContext(AuthContext);

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute exact path='/' component={Home} isAuthenticated={user.logged} />
                    <PrivateRoute exact path='/admin/panel' component={Admin} isAuthenticated={user.logged} />
                </Switch>
            </div>
        </Router>
    )
}
