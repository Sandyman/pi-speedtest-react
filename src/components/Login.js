import React, { Component } from 'react';
import propTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Grid, Jumbotron, Media, Navbar, Row } from 'react-bootstrap';
import { toQuery, } from '../util/utils';
import createState from '../util/state';

import popupWindow from '../util/openWindow';
import * as userActions from '../actions/userActions';
// import { decode } from "jsonwebtoken";

import icon from '../github-icon-2.png';

const getWindowOptions = () => {
  const windowArea = {
    width: Math.max(Math.floor(window.outerWidth * 0.6), 1000),
    height: Math.max(Math.floor(window.outerHeight * 0.9), 630),
  };
  windowArea.left = Math.floor(window.screenX + ((window.outerWidth - windowArea.width) / 2));
  windowArea.top = Math.floor(window.screenY + ((window.outerHeight - windowArea.height) / 8));

  return {
    toolbar: 0,
    scrollbars: 1,
    status: 1,
    resizable: 1,
    location: 1,
    menuBar: 0,
    width: windowArea.width,
    height: windowArea.height,
    left: windowArea.left,
    top: windowArea.top,
  }
};

class Login extends Component {
  // constructor(props) {
  //   super(props);
  // }

  handleLogin() {
    const state = createState();
    const search = toQuery({
      client_id: 'd7af928a33075b0c817c',
      scope: 'user',
      state: state,
      redirect_uri: 'http://localhost:3000/auth/callback',
    });
    const popup = popupWindow.open(
      state,
      `https://github.com/login/oauth/authorize?${search}`,
      getWindowOptions(),
    );
    popup
      .then(response => {
        // console.log(response);
        const { code, state } = response;
        this.props.userActions.authoriseUser(code, state);
      })
      .catch(console.log);
  }

  render() {
    return (
      <Grid bsClass="container">
        <Row>
          <Navbar collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                Pi-Speedtest.net
              </Navbar.Brand>
            </Navbar.Header>
          </Navbar>
        </Row>
        <Row>
          <br/><br/><br/>
        </Row>
        <Row>
          <Jumbotron>
            <Media>
              <Media.Left>
                <img width={288} height={240} src={icon} alt="Purrrr" />
              </Media.Left>
              <Media.Body>
                <Media.Heading>
                  <h3>Log in using GitHub</h3>
                </Media.Heading>
                <p>
                  For now, we only support logging in using GitHub. No need to set up an account or anything, simply click
                  the button below and follow the prompts.
                  <br/>
                  Easy does it.
                </p>
                <br/>
                <p>
                  <Button bsStyle="primary" onClick={this.handleLogin.bind(this)}>Log in using GitHub</Button>
                </p>
              </Media.Body>
            </Media>
          </Jumbotron>
        </Row>
      </Grid>
    );
  }
}

Login.propTypes = {
  isAuthenticated: propTypes.bool,
  isInvalidated: propTypes.bool,
  currentUser: propTypes.object
};

const mapStateToProps = state => {
  const { user } = state;
  return {
    isInvalidated: user.isInvalidated,
    isAuthenticated: user.isAuthenticated,
    currentUser: user.user
  }
};

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
