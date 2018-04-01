import * as ActionTypes from './userActionTypes';
import { decode }  from 'jsonwebtoken';
import { API_ENDPOINT } from '../config';

export const deleteUser = () => {
  return {
    type: ActionTypes.DELETE,
  }
};

export const requestUser = () => {
  return {
    type: ActionTypes.REQUEST,
  }
};

export const injectUser = (user = {}) => {
  return {
    type: ActionTypes.INJECT,
    payload: {
      user
    }
  };
};

export const logoutUser = () => {
  const jwtToken = window.localStorage.getItem('jwtToken');
  if (jwtToken) {
    window.localStorage.removeItem('jwtToken');

    const url = `${API_ENDPOINT}/auth/logout`;
    const header = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${jwtToken}`,
      },
    };
    fetch(url, header).then(() => {});
  }
  return {
    type: ActionTypes.LOGOUT
  }
};

export const authoriseUser = (code, state) => dispatch => {
  const url = `${API_ENDPOINT}/auth/github?code=${code}&state=${state}`;
  const header = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  dispatch(requestUser());
  return fetch(url, header)
    .then(response => {
      if (response.ok) {
        response.json().then(json => {
          const jwtToken = json.token;
          const claims = decode(jwtToken);
          window.localStorage.setItem('jwtToken', jwtToken);
          dispatch(injectUser(claims));
        })
      }
    })
};

export const deleteUserAccount = (sub) => dispatch => {
  const jwtToken = window.localStorage.getItem('jwtToken');
  if (jwtToken) {
    window.localStorage.removeItem('jwtToken');
    const url = `${API_ENDPOINT}/user/${sub}`;
    const header = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`,
      },
    };
    dispatch(deleteUser());
    return fetch(url, header)
      .then(response => {
        if (response.ok) {
          response.json().then(json => {
            console.log(json);
            dispatch(logoutUser());
          })
        } else {
          console.log(response);
        }
      })
  }
};
