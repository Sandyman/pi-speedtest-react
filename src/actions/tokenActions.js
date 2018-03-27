import { apiEndpoint } from "../config-dev";

import * as ActionTypes from './tokenActionTypes';

export const requestToken = () => {
  return {
    type: ActionTypes.REQUEST_TOKEN,
  }
};

export const injectToken = (token = null) => {
  return {
    type: ActionTypes.INJECT_TOKEN,
    payload: {
      token,
    }
  }
};

const query = `
query {
  getToken {
    token
  }
}
`;

const fetchToken = () => dispatch => {
  const jwt = window.sessionStorage.getItem('jwtToken');
  if (!jwt) return;

  const url = `${apiEndpoint}/graphql`;
  const graphqlBody = {
    query: query,
    variables: { }
  };
  const header = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${jwt}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(graphqlBody)
  };
  dispatch(requestToken());
  return fetch(url, header)
    .then(response => {
      if (response.ok) {
        response.json()
          .then(json => dispatch(injectToken(json.data.getToken.token)));
      }
    });
};

const shouldFetchToken = (state) => {
  const { isLoading, token } = state.token;
  if (token) {
    return false;
  }
  return !isLoading;
};

export const fetchTokenIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchToken(getState())) {
    return dispatch(fetchToken());
  }
};
