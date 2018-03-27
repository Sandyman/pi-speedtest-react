import _ from 'underscore';
import * as ActionTypes from './sampleActionTypes';
import { apiEndpoint } from '../config-dev';

export const clearSamples = () => {
  return {
    type: ActionTypes.CLEAR_SAMPLES,
  }
};

export const requestSamples = () => {
  return {
    type: ActionTypes.REQUEST_SAMPLES,
  }
};

export const injectSamples = (samples = []) => {
  return {
    type: ActionTypes.INJECT_SAMPLES,
    payload: {
      samples
    }
  };
};

// Get beans by id
const query = `
query {
  getSamples {
    upload
    download
    ping
    timestamp
  }
}
`;

export const fetchSamples = () => dispatch => {
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
  dispatch(requestSamples);
  return fetch(url, header)
    .then(response => {
      if (response.ok) {
        response.json()
          .then(json => dispatch(injectSamples(json.data.getSamples)));
      }
    });
};

const shouldFetchSamples = (state) => {
  const data = state.data;
  if (_.isEmpty(data.samples)) {
    return true;
  }
  if (data.isLoading) {
    return false;
  }
  return data.isInvalidated;
};

export const fetchSamplesIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchSamples(getState())) {
    return dispatch(fetchSamples());
  }
};
