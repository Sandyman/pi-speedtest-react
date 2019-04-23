import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { Query } from 'react-apollo';
import {
  Col, ControlLabel, Form, FormControl, FormGroup, Image
} from 'react-bootstrap';
import gql from 'graphql-tag';

const GET_USER_INFO = gql`
query {
  me { 
    email 
    avatarUrl 
  }
}
`;

class User extends Component {
  render() {
    const { id, fullName } = this.props;

    return (
      <Query query={GET_USER_INFO} fetchPolicy="cache-first">
        {({ loading, error, data }) => {
          let imageHeader = null;
          let emailField = null;
          let me;
          if (!loading && !error) {
            me = data.me;
            console.log(me);

            emailField = <FormGroup controlId='formHorizontalToken'>
              <Col componentClass={ControlLabel} sm={2}>
                Email
              </Col>
              <Col sm={6}>
                <FormControl.Static>{me.email || 'Your email address will show up here'}</FormControl.Static>
              </Col>
            </FormGroup>;

            imageHeader = <FormGroup controlId='formHorizontalToken'>
              <Col componentClass={ControlLabel} smOffset={2} style={{ paddingLeft: "15px" }}>
                <Image src={me.avatarUrl} rounded width={128} height={128}/>
              </Col>
            </FormGroup>
          }

          return (
            <Form horizontal sm={6}>
              <FormGroup controlId='formHorizontalToken'>
                <Col componentClass={ControlLabel} sm={2}>
                  ID
                </Col>
                <Col sm={4}>
                  <FormControl.Static>{id || 'Your id will show up here'}</FormControl.Static>
                </Col>
              </FormGroup>
              <FormGroup controlId='formHorizontalToken'>
                <Col componentClass={ControlLabel} sm={2}>
                  Name
                </Col>
                <Col sm={4}>
                  <FormControl.Static>{fullName || 'Your id will show up here'}</FormControl.Static>
                </Col>
              </FormGroup>
              {emailField}
              {imageHeader}
              <FormGroup controlId='formHorizontalToken'>
                <Col componentClass={ControlLabel} sm={2}>
                  Donate
                </Col>
                <Col sm={8}>
                  <FormControl.Static>
                    Support Pi Speedtest: <a href={"https://pispeedtest.memberful.com/checkout?plan=38175"}>Monthly ($1.49)</a> or <a href={" https://pispeedtest.memberful.com/checkout?plan=38176 "}>Yearly ($14.99)</a> (16.7% discount).
                  </FormControl.Static>
                </Col>
              </FormGroup>


            </Form>
          );
        }}
      </Query>
    );
  }
}

User.propTypes = {
  id: propTypes.string,
  fullName: propTypes.string,
};

const mapStateToProps = state => {
  const { user } = state.user;
  return {
    id: user.sub,
    fullName: user.name,
  };
};

export default connect(mapStateToProps)(User);
