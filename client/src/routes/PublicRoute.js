import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {
    return (
        <Route { ...rest }
            component={ (props) => (
                ( isAuthenticated != 'Usted está autorizado correctamente!')
                    ? ( <Component { ...props } /> )
                    : ( <Redirect to="/" /> )
            )}        
        />
    )
}

PublicRoute.propTypes = {
    isAuthenticated: PropTypes.any.isRequired,
    component: PropTypes.func.isRequired
}