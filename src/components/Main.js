import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ProtectedRoute from '../router/ProtectedRoute';
import Account from './Account';
import Home from './Home';
import Login from './Login';
import Success from './Success';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home} />
      <ProtectedRoute path='/account' component={Account} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/auth/callback' component={Success} />
    </Switch>
  </main>
);

export default Main;
