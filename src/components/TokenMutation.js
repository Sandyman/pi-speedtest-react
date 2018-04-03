import React from 'react';
import { Mutation } from 'react-apollo';
import gql from "graphql-tag";
import NewTokenButton from './NewTokenButton';
import NewTokenModal from './NewTokenModal';

const CREATE_TOKEN = gql`
mutation {
  createToken {
    token
  }
}
`;

const TokenMutation = (props) => (
  <p>
    <Mutation
      mutation={CREATE_TOKEN}
      update={(cache, { data: { createToken }}) => {
        cache.writeQuery({
          query: props.query,
          data: { getToken: createToken },
        });
      }}
    >
      {(createToken) => (
        <span>
          <NewTokenButton
            loading={props.loading}
            handleRefresh={props.handleRefresh}
          />
          <NewTokenModal
            show={props.show}
            handleClose={props.handleClose}
            createToken={createToken}
          />
        </span>
      )}
    </Mutation>
  </p>
);

export default TokenMutation;
