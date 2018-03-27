import { graphql } from './utils';

import * as ActionTypes from './statsActionTypes';

export const requestStats = () => {
  return {
    type: ActionTypes.REQUEST_STATS,
  }
};

export const injectStats = (stats = null) => {
  return {
    type: ActionTypes.INJECT_STATS,
    payload: {
      stats,
    }
  }
};

const getStatsQuery = `
{ 
  getStats { 
    ping { 
      ...stats 
    } 
    upload { 
      ...stats 
    } 
    download { 
      ...stats 
    } 
  }
} 

fragment stats on Stat { 
  min 
  max 
  mean 
  std 
}
`;

const fetchStats = () => dispatch => {
  const callback = (json) => {
    console.log(JSON.stringify(json.data, null, 3));
    return dispatch(injectStats(json.data.getStats));
  };
  dispatch(requestStats());
  return graphql({
      query: getStatsQuery,
      variables: { },
    },
    callback
  );
};

const shouldFetchStats = (state) => {
  const { isLoading, stats } = state.stats;
  if (stats !== null) {
    return false;
  }
  return !isLoading;
};

export const fetchStatsIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchStats(getState())) {
    return dispatch(fetchStats());
  }
};
