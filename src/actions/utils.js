import { API_ENDPOINT } from '../config';

export const graphql = ({query, variables}, callback) => {
  const jwt = window.localStorage.getItem('jwtToken');
  if (!jwt) return;

  const url = `${API_ENDPOINT}/graphql`;
  const graphqlBody = {
    query,
    variables,
  };
  const header = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${jwt}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(graphqlBody)
  };
  return fetch(url, header)
    .then(response => {
      if (response.ok) {
        response.json().then(callback);
      }
    });
};
