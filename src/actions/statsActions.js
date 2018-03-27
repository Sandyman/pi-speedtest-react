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

export const fetchStats = () => dispatch => {
  const callback = (json) => dispatch(injectStats(json.data.getStats));
  dispatch(requestStats());
  return graphql({
      query: getStatsQuery,
      variables: { },
    },
    callback
  );
};
