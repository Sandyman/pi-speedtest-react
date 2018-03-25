import * as actionTypes from '../actions/sampleActionTypes';

export const initialState = {
  isInvalidated: false,
  isLoading: false,
  samples: [],
};

const sampleReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.INJECT_SAMPLES:
      return {
        ...state,
        isInvalidated: false,
        isLoading: false,
        samples: payload.samples,
      };

    case actionTypes.REFRESH_SAMPLES:
      return {
        ...state,
        isInvalidated: true,
      };

    case actionTypes.REQUEST_SAMPLES:
      return {
        ...state,
        isLoading: true,
        isInvalidated: false,
      };

    default:
      return state;
  }

};

export default sampleReducer;
