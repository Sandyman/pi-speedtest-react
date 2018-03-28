import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Account from './components/Account';
import Chart from './components/Chart';
import Login from './components/Login';
import Success from './components/Success';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Login} />
      <Route path='/account' component={Account} />
      <Route path='/charts' component={Chart} />
      <Route exact path='/auth/callback' component={Success} />
    </Switch>
  </main>
);

export default Main;
