import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    !!window.localStorage.getItem('jwtToken')
      ? <Component {...props} />
      : <Redirect to='/' />
  )} />
);

export default ProtectedRoute;
