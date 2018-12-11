import React from 'react';
import { Redirect, Route } from "react-router";
import auth0Client from "../utils/Auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        auth0Client.isAuthenticated() === true
            ? <Component {...props} />
            : <Redirect to='/login' />
    )} />
);

export default PrivateRoute;