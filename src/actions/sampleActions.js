import _ from 'underscore';
import * as ActionTypes from './sampleActionTypes';
import { graphql } from "./utils";

let timeout = null;

export const clearError = () => {
  return {
    type: ActionTypes.CLEAR_ERROR,
  }
};

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

export const timeoutSamples = () => {
  return {
    type: ActionTypes.TIMEOUT_SAMPLES,
  }
};

const getSamplesQuery = `
query {
  getSamples {
    upload
    download
    ping
    timestamp
  }
}
`;

const fetchSamples = () => dispatch => {
  dispatch(requestSamples());
  timeout = setTimeout(() => dispatch(timeoutSamples()), 15000);

  const callback = (json) => {
    clearTimeout(timeout);
    timeout = null;
    return dispatch(injectSamples(json.data.getSamples));
  };
  return graphql({
      query: getSamplesQuery,
      variables: { },
    },
    callback
  );
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

export const fetchSamplesIfNeeded = (force) => (dispatch, getState) => {
  if (force || shouldFetchSamples(getState())) {
    return dispatch(fetchSamples());
  }
};
