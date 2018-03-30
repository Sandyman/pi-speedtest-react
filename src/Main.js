import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Account from './components/Account';
import Chart from './containers/Chart';
import Connection from './components/Connection';
import Login from './containers/Login';
import Success from './components/Success';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Login} />
      <Route path='/connection' component={Connection} />
      <Route path='/charts' component={Chart} />
      <Route path='/account' component={Account} />
      <Route exact path='/auth/callback' component={Success} />
    </Switch>
  </main>
);

export default Main;
