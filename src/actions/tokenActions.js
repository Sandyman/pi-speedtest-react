import { apiEndpoint } from "../config-dev";

import * as ActionTypes from './tokenActionTypes';

export const createToken = () => {
  return {
    type: ActionTypes.CREATE_TOKEN,
  }
};

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

const createTokenMutation = `
mutation {
  createToken {
    token
  }
}
`;

const getTokenQuery = `
query {
  getToken {
    token
  }
}
`;

const graphql = ({query, variables}, callback) => {
  const jwt = window.sessionStorage.getItem('jwtToken');
  if (!jwt) return;

  const url = `${apiEndpoint}/graphql`;
  const graphqlBody = {
    query,
    variables,
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
  return fetch(url, header)
    .then(response => {
      if (response.ok) {
        response.json().then(callback);
      }
    });
};

const fetchToken = () => dispatch => {
  const callback = (json) => dispatch(injectToken(json.data.getToken.token));
  dispatch(requestToken());
  return graphql({
      query: getTokenQuery,
      variables: { },
    },
    callback
  );
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

export const createNewToken = () => (dispatch) => {
  const callback = (json) => dispatch(injectToken(json.data.createToken.token));
  dispatch(createToken());
  return graphql({
      query: createTokenMutation,
      variables: { },
    },
    callback
  );
};
