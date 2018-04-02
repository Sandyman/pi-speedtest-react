import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ProtectedRoute from './containers/ProtectedRoute';
import Account from './components/Account';
import ChartGql from './containers/ChartGql';
import Connection from './components/Connection';
import Login from './containers/Login';
import Success from './components/Success';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Login} />
      <ProtectedRoute exact path='/connection' component={Connection} />
      <ProtectedRoute exact path='/charts' component={ChartGql} />
      <ProtectedRoute exact path='/account' component={Account} />
      <Route exact path='/auth/callback' component={Success} />
    </Switch>
  </main>
);

export default Main;
