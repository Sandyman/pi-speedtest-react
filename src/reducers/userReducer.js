import * as ActionTypes from '../actions/userActionTypes';

export const initialState = {
  isAuthenticated: false,
  isInvalidated: false,
  isLoading: false,
  user: {}
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ActionTypes.DELETE:
      return {
        ...initialState,
      };

    case ActionTypes.INJECT:
      return {
        ...state,
        isAuthenticated: true,
        isInvalidated: false,
        isLoading: false,
        user: payload.user
      };

    case ActionTypes.LOGOUT:
      return {
        ...initialState,
      };

    case ActionTypes.REFRESH:
      return {
        ...state,
        isInvalidated: true,
      };

    case ActionTypes.REQUEST:
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
