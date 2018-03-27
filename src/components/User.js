import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import {
  Col, ControlLabel, Form, FormControl, FormGroup
} from 'react-bootstrap';

class User extends Component {
  render() {
    const { id, fullName } = this.props;

    return (
      <Form horizontal sm={8}>
        <FormGroup controlId='formHorizontalToken'>
          <Col componentClass={ControlLabel} sm={2}>
            ID
          </Col>
          <Col sm={6}>
            <FormControl.Static>{id || 'Your id will show up here'}</FormControl.Static>
          </Col>
        </FormGroup>
        <FormGroup controlId='formHorizontalToken'>
          <Col componentClass={ControlLabel} sm={2}>
            Name
          </Col>
          <Col sm={6}>
            <FormControl.Static>{fullName || 'Your id will show up here'}</FormControl.Static>
          </Col>
        </FormGroup>
      </Form>
    )
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
