import { decode } from 'jsonwebtoken';
import * as ActionTypes from '../actions/userActionTypes';

const { localStorage } = window;

export const initialState = {
  isAuthenticated: !!localStorage.getItem('jwt'),
  isInvalidated: false,
  isLoading: false,
  user: localStorage.getItem('jwt') ? decode(localStorage.getItem('jwt')) : {},
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
