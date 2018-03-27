import * as actionTypes from "../actions/statsActionTypes";

export const initialState = {
  isLoading: false,
  stats: null,
};

const statsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.INJECT_STATS:
      return {
        ...state,
        isLoading: false,
        stats: payload.stats,
      };

    case actionTypes.REQUEST_STATS:
      return {
        ...state,
        isLoading: true,
      };

    default:
      return state;
  }

};

export default statsReducer;
