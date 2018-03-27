import _ from 'underscore';
import * as ActionTypes from './sampleActionTypes';
import { graphql } from "./utils";

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
  const callback = (json) => dispatch(injectSamples(json.data.getSamples));
  dispatch(requestSamples());
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
  if (!!force || shouldFetchSamples(getState())) {
    return dispatch(fetchSamples());
  }
};
