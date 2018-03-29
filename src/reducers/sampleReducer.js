import * as actionTypes from '../actions/sampleActionTypes';

export const initialState = {
  errorMessage: '',
  isError: false,
  isInvalidated: false,
  isLoading: false,
  samples: [],
};

const sampleReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.CLEAR_ERROR:
      return {
        ...state,
        isError: false,
      };

    case actionTypes.CLEAR_SAMPLES:
      return {
        ...initialState,
      };

    case actionTypes.INJECT_SAMPLES:
      return {
        ...state,
        errorMessage: '',
        isError: false,
        isInvalidated: false,
        isLoading: false,
        samples: payload.samples,
      };

    case actionTypes.REFRESH_SAMPLES:
      return {
        ...state,
        errorMessage: '',
        isError: false,
        isInvalidated: true,
      };

    case actionTypes.REQUEST_SAMPLES:
      return {
        ...state,
        errorMessage: '',
        isError: false,
        isLoading: true,
        isInvalidated: false,
      };

    case actionTypes.TIMEOUT_SAMPLES:
      return {
        ...state,
        errorMessage: 'The operation timed out. Please try again.',
        isError: true,
        isLoading: false,
        isInvalidated: false,
      };

    default:
      return state;
  }

};

export default sampleReducer;
