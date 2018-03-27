import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { Button, Col, ControlLabel, Form, FormControl, FormGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { bindActionCreators } from "redux";

import * as tokenActions from '../actions/tokenActions';

class Token extends Component {
  componentDidMount() {
    this.props.tokenActions.fetchTokenIfNeeded();
  }

  handleRefresh() {
    console.log('Refresh');
  }

  render() {
    const { isLoading, token } = this.props;

    const tooltip = <Tooltip placement="bottom" className="in" id="tooltip-bottom">
      The token is the way to authenticate your data when you're running an actual speedtest.
      Copy this string and place it in a file <code>~/.st/config</code> like so: <code>token: {'<token>'}</code>.
    </Tooltip>;

    return (
      <Form horizontal sm={8}>
        <FormGroup controlId='formHorizontalToken'>
          <Col componentClass={ControlLabel} sm={2}>
            Token
          </Col>
          <Col sm={6}>
            <OverlayTrigger placement="bottom" overlay={tooltip}>
            <FormControl.Static>{token ? token : 'Your token will show up here'}</FormControl.Static>
            </OverlayTrigger>
          </Col>
          <Col sm={2}>
            <Button bsStyle='warning' disabled={isLoading} onClick={this.handleRefresh.bind(this)}>Refresh</Button>
          </Col>
        </FormGroup>
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
