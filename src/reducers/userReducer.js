import * as actionTypes from '../actions/userActionTypes';

export const initialState = {
  isAuthenticated: false,
  isInvalidated: false,
  isLoading: false,
  user: {}
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.INJECT:
      return {
        ...state,
        isAuthenticated: true,
        isInvalidated: false,
        isLoading: false,
        user: payload.user
      };

    case actionTypes.LOGOUT:
      return {
        ...initialState,
      };

    case actionTypes.REFRESH:
      return {
        ...state,
        isInvalidated: true,
      };

    case actionTypes.REQUEST:
      return {
        ...state,
        isLoading: true,
        isInvalidated: false,
        isAuthenticated: false,
      };

    default:
      return state;
  }
};

export default userReducer;
