import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-boost';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { apiEndpoint } from './config';

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

const httpLink = createHttpLink({
  uri: `${apiEndpoint}/graphql`,
});

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = window.localStorage.getItem('jwtToken');
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : null,
    }
  });
  return forward(operation);
});

const client = new ApolloClient({
  link: authMiddleware.concat(httpLink),
  cache: new InMemoryCache(),
});

render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <Main/>
      </BrowserRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);
