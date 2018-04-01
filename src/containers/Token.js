import React, { Component } from 'react';
import {
  Button, Col, Collapse, ControlLabel, Fade, Form, FormControl, FormGroup, Glyphicon, Modal, OverlayTrigger, Tooltip
} from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';

const GET_TOKEN = gql`
query {
  getToken {
    token
  }
}
`;

const CREATE_TOKEN = gql`
mutation {
  createToken {
    token
  }
}
`;

class Token extends Component {
  constructor(props) {
    super(props);

    this.handleClose = this.handleClose.bind(this);
    this.handleCopy = this.handleCopy.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleTokenInfoToggle = this.handleTokenInfoToggle.bind(this);

    this.state = {
      isCopied: false,
      showModal: false,
      showTokenInfo: false,
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

  handleTokenInfoToggle() {
    this.setState({
      showTokenInfo: !this.state.showTokenInfo,
    })
  }

  render() {
    const tooltip = <Tooltip id="tooltip-right">
      Use this button to generate a new authentication token.
      This will invalidate your old token, so make sure you know this is what you want.
    </Tooltip>;

    const tooltipCopy = <Tooltip id="tooltip-right">
      Use this button to copy the token string, which you can paste verbatim into your config file.
    </Tooltip>;

    const buttonText = this.state.showTokenInfo ? 'Close' : 'What is this?';
    return (
      <Query query={GET_TOKEN} fetchPolicy="cache-and-network">
        {({ loading, error, data }) => {
          if (error) return 'Error...';

          const { token } = data.getToken || {};
          const tokenStr = token ? token
            : loading ? 'Loading...' : 'It looks like you don\'t have a token yet';

          const explanation = token
            ? <p>
                We use this token to authenticate you when the speedtest uploads your results.<br/>
                Copy this string and paste it in a file <code>~/.st/config</code> like so: <br/>
                <code>token: {token || '...'}</code>&nbsp;
                <CopyToClipboard
                  text={`token: ${token}`}
                  onCopy={this.handleCopy}>
                  <OverlayTrigger placement="right" overlay={tooltipCopy}>
                    <Button disabled={!token}>
                      <Glyphicon glyph="glyphicon glyphicon-copy" />
                    </Button>
                  </OverlayTrigger>
                </CopyToClipboard>
                &nbsp;&nbsp;
                <Fade in={this.state.isCopied} timeout={500}>
                  <span style={{color: 'red', fontSize: '0.8em'}}>Copied.</span>
                </Fade>
              <br/>
              </p>
            : null;

          return (
            <div>
              <Form horizontal sm={8}>
                <FormGroup controlId='formHorizontalToken'>
                  <Col componentClass={ControlLabel} sm={2}>
                    Token
                  </Col>
                  <Col sm={5}>
                    <FormControl.Static>{tokenStr}</FormControl.Static>
                  </Col>
                  <Col sm={2}>
                  </Col>
                </FormGroup>
                <Col smOffset={1}>
                  <Button bsSize="xsmall" onClick={this.handleTokenInfoToggle}>{buttonText}</Button>
                  <Collapse in={this.state.showTokenInfo} timeout={800}>
                    <div>
                      <br/>
                      {explanation}
                      <p>
                        <OverlayTrigger placement="right" overlay={tooltip}>
                          <Mutation
                            mutation={CREATE_TOKEN}
                            update={(cache, { data: { createToken }}) => {
                              cache.writeQuery({
                                query: GET_TOKEN,
                                data: { getToken: createToken },
                              });
                            }}
                          >
                            {(createToken) => (
                              <span>
                              <OverlayTrigger placement="right" overlay={tooltip}>
                                <Button bsStyle='warning' disabled={loading} onClick={this.handleRefresh}>
                                  <Glyphicon glyph="glyphicon glyphicon-refresh"/> Regenerate
                                </Button>
                              </OverlayTrigger>

                              <Modal show={this.state.showModal} onHide={this.handleClose}>
                                <Modal.Header closeButton>
                                  <Modal.Title>Warning</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                  When you regenerate the authentication token, your old token will be invalidated immediately.
                                  Don't forget to copy/paste the new token once it's been generated.
                                  <br/><br/>
                                  Do you really want to generate a new authentication token?
                                </Modal.Body>
                                <Modal.Footer>
                                  <Button bsStyle="primary" className="pull-left" onClick={() => {
                                    setTimeout(createToken, 100);
                                    this.handleClose();
                                  }}>
                                    Yes
                                  </Button>
                                  <Button className="pull-left" onClick={this.handleClose}>Cancel</Button>
                                </Modal.Footer>
                              </Modal>
                            </span>
                            )}
                          </Mutation>
                        </OverlayTrigger>
                      </p>
                    </div>
                  </Collapse>
                </Col>
              </Form>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Token;
