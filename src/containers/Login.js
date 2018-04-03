import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Grid, Navbar, ProgressBar, Row } from 'react-bootstrap';
import { toQuery, } from '../util/utils';
import createState from '../util/state';
import GitHubLogin from '../components/GitHubLogin';
import NavbarHeader from '../components/NavbarHeader';
import popupWindow from '../util/openWindow';
import * as userActions from '../actions/userActions';
import { CLIENT_ID, REDIRECT_URL} from "../config";

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

    this.handleLogin = this.handleLogin.bind(this);
    this.state = {
      showSpinner: false,
    }
  }

  handleLogin() {
    const secretState = createState();
    const qs = toQuery({
      client_id: CLIENT_ID,
      scope: 'user:email',
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
        this.props.userActions.authoriseUser(code, state, () => {
          this.props.history.push('/account');
        });
        this.setState({
          showSpinner: true,
        })
      })
      .catch(console.log);
  }

  render() {
    const progressBar = this.state.showSpinner
      ? <ProgressBar active now={100} label='Hold on...'/>
      : <br/>;

    return (
      <Grid bsClass="container">
        <Row>
          <Navbar>
            <NavbarHeader/>
          </Navbar>
        </Row>
        <Row>
          {progressBar}
          <br/><br/>
        </Row>
        <Row>
          <GitHubLogin
            showSpinner={this.state.showSpinner}
            handleClick={this.handleLogin}
          />
        </Row>
      </Grid>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch)
});

export default withRouter(connect(null, mapDispatchToProps)(Login));
