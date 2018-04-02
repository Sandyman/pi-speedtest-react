import React, { Component } from 'react';
import propTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Grid, Jumbotron, Media, Navbar, ProgressBar, Row } from 'react-bootstrap';
import { toQuery, } from '../util/utils';
import createState from '../util/state';
import NavbarHeader from '../components/NavbarHeader';
import popupWindow from '../util/openWindow';
import * as userActions from '../actions/userActions';
// import { decode } from "jsonwebtoken";
import { CLIENT_ID, REDIRECT_URL} from "../config";

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
  constructor(props) {
    super(props);

    this.state = {
      showSpinner: false,
    }
  }

  handleLogin() {
    const secretState = createState();
    const qs = toQuery({
      client_id: CLIENT_ID,
      scope: 'user',
      state: secretState,
      redirect_uri: REDIRECT_URL,
    });
    const popup = popupWindow.open(
      secretState,
      `https://github.com/login/oauth/authorize?${qs}`,
      getWindowOptions(),
    );
    popup
      .then(response => {
        const { code, state } = response;
        this.props.userActions.authoriseUser(code, state);
        this.setState({
          showSpinner: true,
        })
      })
      .catch(console.log);
  }

  render() {
    const { isAuthenticated } = this.props;
    if (isAuthenticated) {
      this.props.history.push('/account');
      return null;
    }

    const progressBar = this.state.showSpinner
      ? <ProgressBar active now={100} label='Hold on...'/>
      : null;

    return (
      <Grid bsClass="container">
        <Row>
          <Navbar>
            <NavbarHeader/>
          </Navbar>
        </Row>
        <Row>
          <br/><br/><br/>
        </Row>
        <Row>
          {progressBar}
          <Jumbotron>
            <Media>
              <Media.Left>
                <img width={288} height={240} src={icon} alt="Purrrr"/>
              </Media.Left>
              <Media.Body>
                <Media.Heading>
                  Log in using GitHub<br/><br/>
                </Media.Heading>
                <p>
                  For now, we only support logging in using GitHub. No need to set up an account or anything, simply
                  click the button below and follow the prompts.
                  <br/>
                  Easy does it.
                </p>
                <br/>
                <p>
                  <Button disabled={this.state.showSpinner} bsStyle="primary" onClick={this.handleLogin.bind(this)}>Log in using GitHub</Button>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
