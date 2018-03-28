import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import {
  Button, Col, ControlLabel, Form, FormControl, FormGroup, OverlayTrigger, Tooltip
} from 'react-bootstrap';
import { bindActionCreators } from "redux";

import * as tokenActions from '../actions/tokenActions';

class Token extends Component {
  handleRefresh() {
    this.props.tokenActions.createNewToken();
  }

  render() {
    const { isLoading, token } = this.props;

    const tooltip = <Tooltip id="tooltip-right">
      Use this button to generate a new authentication token.
      This will invalidate your old token, so make sure you know this is what you want.
    </Tooltip>;

    return (
      <Form horizontal sm={8}>
        <FormGroup controlId='formHorizontalToken'>
          <Col componentClass={ControlLabel} sm={2}>
            Token
          </Col>
          <Col sm={6}>
            <FormControl.Static>{token ? token : 'Your token will show up here'}</FormControl.Static>
          </Col>
          <Col sm={2}>
            <OverlayTrigger placement="right" overlay={tooltip}>
              <Button bsStyle='warning' disabled={isLoading} onClick={this.handleRefresh.bind(this)}>Regenerate</Button>
            </OverlayTrigger>
          </Col>
        </FormGroup>
        <Col smOffset={1}>
          <br/>
          <p>
            We use this token to authenticate you when the speedtest uploads your results.<br/>
            Copy this string and place it in a file <code>~/.st/config</code> like so: <br/><br/>
            <code>token: {token || '...'}</code>
            <br/><br/>
          </p>
        </Col>
        {/*<FormGroup>*/}
          {/*<Col smOffset={2} sm={6}>*/}
            {/*<Button bsStyle="danger">Delete</Button>*/}
          {/*</Col>*/}
        {/*</FormGroup>*/}
      </Form>
    )
  }
}

Token.propTypes = {
  isLoading: propTypes.bool,
  token: propTypes.string,
};

const mapStateToProps = state => {
  const { isLoading, token } = state.token;
  return {
    isLoading,
    token,
  };
};

const mapDispatchToProps = dispatch => ({
  tokenActions: bindActionCreators(tokenActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Token);
