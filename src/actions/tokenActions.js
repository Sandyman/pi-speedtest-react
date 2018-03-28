import { graphql } from './utils'

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

const fetchToken = () => dispatch => {
  const callback = (json) => {
    const token = json.data.getToken ? json.data.getToken.token : '';
    return dispatch(injectToken(token));
  };
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
  if (token !== null) {
    return false;
  }
  return !isLoading;
};

export const fetchTokenIfNeeded = (force) => (dispatch, getState) => {
  if (force || shouldFetchToken(getState())) {
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
