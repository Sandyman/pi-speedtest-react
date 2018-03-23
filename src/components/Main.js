import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Success from './Success';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/login' component={Login} />
      <Route path='/auth/callback' component={Success} />
    </Switch>
  </main>
);

export default Main;
