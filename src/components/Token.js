import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import {
  Button, Col, ControlLabel, Form, FormControl, FormGroup, OverlayTrigger, Popover, Tooltip
} from 'react-bootstrap';
import { bindActionCreators } from "redux";

import * as sampleActions from '../actions/sampleActions';
import * as tokenActions from '../actions/tokenActions';

class Token extends Component {
  componentDidMount() {
    this.props.tokenActions.fetchTokenIfNeeded();
  }

  handleRefresh() {
    this.props.tokenActions.createNewToken();
  }

  render() {
    const { isLoading, token } = this.props;

    const popover = <Popover id="popover-positioned-bottom" title="Authentication token">
      We use this token to authenticate you when the speedtest uploads your results.
      Copy this string and place it in a file <code>~/.st/config</code> like so:<br/><br/>
      <code>token: {token ? token.substring(0,18) : ''}...</code>
    </Popover>;

    const tooltip = <Tooltip id="tooltip-right">
      Use this button to refresh your authentication token.<br/>
      This will invalidate your old token, so make sure you know this is what you want.
    </Tooltip>;

    return (
      <Form horizontal sm={8}>
        <FormGroup controlId='formHorizontalToken'>
          <Col componentClass={ControlLabel} sm={2}>
            Token
          </Col>
          <Col sm={6}>
            <OverlayTrigger placement="bottom" overlay={popover}>
            <FormControl.Static>{token ? token : 'Your token will show up here'}</FormControl.Static>
            </OverlayTrigger>
          </Col>
          <Col sm={2}>
            <OverlayTrigger placement="right" overlay={tooltip}>
              <Button bsStyle='warning' disabled={isLoading} onClick={this.handleRefresh.bind(this)}>Refresh</Button>
            </OverlayTrigger>
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
  const { isAuthenticated } = state.user;
  const { isLoading, token } = state.token;
  return {
    isAuthenticated,
    isLoading,
    token,
  };
};

const mapDispatchToProps = dispatch => ({
  sampleActions: bindActionCreators(sampleActions, dispatch),
  tokenActions: bindActionCreators(tokenActions, dispatch),
});


export default connect(mapStateToProps, mapDispatchToProps)(Token);
