import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({
    isAuthenticated,
    isAdmin,
    component: Component,
    ...rest
}) => {

    localStorage.setItem('lastPath', rest.location.pathname);

    return (
        <Route {...rest}
            component={(props) => {
                if (isAuthenticated == 'Usted está autorizado correctamente!' && isAdmin == 'admin') {                    
                    return (<Component {...props} />)
                } else {
                    localStorage.clear();
                    return (<Redirect to="/login/loginuser" />)
                }
            }}
        />
    )
}

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.any.isRequired,
    isAdmin: PropTypes.string.isRequired,
    component: PropTypes.func.isRequired
}
