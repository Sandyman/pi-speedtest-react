import * as actionTypes from "../actions/tokenActionTypes";

export const initialState = {
  isLoading: false,
  token: null,
};

const tokenReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.CREATE_TOKEN:
      return {
        ...state,
        isLoading: true,
      };

    case actionTypes.INJECT_TOKEN:
      return {
        ...state,
        isLoading: false,
        token: payload.token,
      };

    case actionTypes.REQUEST_TOKEN:
      return {
        ...state,
        isLoading: true,
      };

    default:
      return state;
  }

};

export default tokenReducer;
