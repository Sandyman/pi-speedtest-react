import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';

import reducer from './reducers'
import thunk from 'redux-thunk'

import Main from './Main';

import './index.css';

const configMiddleware = [ thunk ];
const initialState = (window && window.__INITIALSTATE__) || {};
const composeEnhancers = (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(...configMiddleware))
);

render(
  <Provider store={store}>
    <BrowserRouter>
      <Main/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
