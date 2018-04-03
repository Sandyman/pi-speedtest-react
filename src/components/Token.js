import React, { Component } from 'react';
import { Button, Col, Collapse, ControlLabel, Form, FormControl, FormGroup } from 'react-bootstrap';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Clippy from './Clippy';
import Copied from './Copied';
import TokenMutation from './TokenMutation';

const GET_TOKEN = gql`
query {
  getToken {
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
    const buttonText = this.state.showTokenInfo ? 'Close' : 'What is this?';
    return (
      <Query query={GET_TOKEN} fetchPolicy="cache-and-network">
        {({ loading, error, data }) => {
          if (error) return 'Error...';

          const { token } = data.getToken || {};
          const tokenStr = token
            ? token
            : loading
              ? 'Loading...'
              : 'It looks like you don\'t have a token yet';

          const explanation = token
            ? <p>
                We use this token to authenticate you when the speedtest uploads your results.<br/>
                Copy this string and paste it in a file <code>~/.st/config</code> like so: <br/>
                <code>token: {token || '...'}</code>&nbsp;
                <Clippy
                  handleCopy={this.handleCopy}
                  text={`token: ${token}`}
                  source={token}
                />
                &nbsp;&nbsp;
                <Copied
                  copied={this.state.isCopied}
                />
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
                      <TokenMutation
                        handleRefresh={this.handleRefresh}
                        handleClose={this.handleClose}
                        loading={loading}
                        query={GET_TOKEN}
                        show={this.state.showModal}
                      />
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
