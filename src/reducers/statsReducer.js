import * as actionTypes from "../actions/statsActionTypes";

export const initialState = {
  isLoading: false,
  recent: null,
  stats: null,
};

const statsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  console.log(payload);
  switch (type) {
    case actionTypes.INJECT_STATS:
      return {
        ...state,
        isLoading: false,
        recent: payload.data.getLastSample,
        stats: payload.data.getStats,
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
