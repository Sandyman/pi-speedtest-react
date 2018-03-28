import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import {
  Button, Col, ControlLabel, Fade, Form, FormControl, FormGroup, Glyphicon, Label, Modal, OverlayTrigger, Tooltip
} from 'react-bootstrap';
import { bindActionCreators } from "redux";
import { CopyToClipboard } from 'react-copy-to-clipboard';

import * as tokenActions from '../actions/tokenActions';

class Token extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isCopied: false,
      showModal: false,
    }
  }

  handleClose() {
    this.setState({
      showModal: false,
    })
  }

  handleCopy() {
    setTimeout(() => {
      this.setState({
        isCopied: false,
      })
    }, 2000);
    this.setState({
      isCopied: true,
    })
  }

  handleRefresh() {
    this.setState({
      showModal: true,
    })
  }

  handleRegenerate() {
    this.setState({
      showModal: false,
    });
    this.props.tokenActions.createNewToken();
  }

  render() {
    const { isLoading, token } = this.props;

    const tooltip = <Tooltip id="tooltip-right">
      Use this button to generate a new authentication token.
      This will invalidate your old token, so make sure you know this is what you want.
    </Tooltip>;

    const tooltipCopy = <Tooltip id="tooltip-right">
      Use this button to copy the token string, which you can paste verbatim into your config file.
    </Tooltip>;

    return (
      <div>
      <Form horizontal sm={8}>
        <FormGroup controlId='formHorizontalToken'>
          <Col componentClass={ControlLabel} sm={2}>
            Token
          </Col>
          <Col sm={5}>
            <FormControl.Static>{token ? token : 'Your token will show up here'}</FormControl.Static>
          </Col>
          <Col sm={2}>
            <OverlayTrigger placement="right" overlay={tooltip}>
              <Button bsStyle='primary' disabled={isLoading} onClick={this.handleRefresh.bind(this)}>
                <Glyphicon glyph="glyphicon glyphicon-refresh"/>
              </Button>
            </OverlayTrigger>
          </Col>
        </FormGroup>
        <Col smOffset={1}>
          <br/>
          <div>
            <h4><Label bsStyle="primary">What is it?</Label></h4>
          </div>
          <p>
            We use this token to authenticate you when the speedtest uploads your results.<br/>
            Copy this string and paste it in a file <code>~/.st/config</code> like so: <br/><br/>
            <code>token: {token || '...'}</code>&nbsp;
            <CopyToClipboard
              text={`token: ${token}`}
              onCopy={this.handleCopy.bind(this)}>
              <OverlayTrigger placement="right" overlay={tooltipCopy}>
                <Button disabled={!token}>
                  <Glyphicon glyph="glyphicon glyphicon-copy" />
                </Button>
              </OverlayTrigger>
            </CopyToClipboard>
            &nbsp;&nbsp;
            <Fade in={this.state.isCopied} timeout={500}>
              <span style={{color: 'red'}}>Copied.</span>
            </Fade>
            <br/>
          </p>
        </Col>
        {/*<FormGroup>*/}
          {/*<Col smOffset={2} sm={6}>*/}
            {/*<Button bsStyle="danger">Delete</Button>*/}
          {/*</Col>*/}
        {/*</FormGroup>*/}
      </Form>
      <Modal show={this.state.showModal} onHide={this.handleClose.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          When you regenerate the authentication token, your old token will be invalidated immediately. Don't forget
          to copy/paste the new token once it's been generated.
          <br/><br/>
          Do you really want to generate a new authentication token?
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="primary" className="pull-left" onClick={this.handleRegenerate.bind(this)}>
            Yes
          </Button>
          <Button className="pull-left" onClick={this.handleClose.bind(this)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
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