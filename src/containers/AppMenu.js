import React, { Component } from 'react';
import { MenuItem, Nav, Navbar, NavDropdown, NavItem } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import propTypes from 'prop-types';
import { decode } from 'jsonwebtoken';
import NavbarHeader from '../components/NavbarHeader';

import * as userActions from '../actions/userActions';
import * as sampleActions from '../actions/sampleActions';
import * as tokenActions from '../actions/tokenActions';
import * as statsActions from '../actions/statsActions';

class AppMenu extends Component {
  componentDidMount() {
    let jwtToken;
    if (window.sessionStorage) {
      jwtToken = window.sessionStorage.getItem('jwtToken');
      if (jwtToken) {
        const claims = decode(jwtToken);
        this.props.userActions.injectUser(claims);
        this.props.tokenActions.fetchTokenIfNeeded();
        this.props.statsActions.fetchStatsIfNeeded();
      }
    }
  }

  handleAccount() {
    this.props.history.push('/account');
  }

  handleCharts() {
    this.props.history.push('/charts');
  }

  handleLogin() {
    this.props.history.push('/');
  }

  handleLogout() {
    this.props.sampleActions.clearSamples();
    this.props.userActions.logoutUser();
    this.props.history.push('/');
  }

  render() {
    const { isAuthenticated, isLoading, currentUser } = this.props;

    const loginButton = isAuthenticated ?
      <NavDropdown title={isAuthenticated ? currentUser.name : ''} id="basic-nav-dropdown">
        <MenuItem onClick={this.handleAccount.bind(this)}>Account</MenuItem>
        <MenuItem onClick={this.handleCharts.bind(this)}>Charts</MenuItem>
        <MenuItem divider />
        <MenuItem onClick={this.handleLogout.bind(this)}>Log Out</MenuItem>
      </NavDropdown>
      :
      <NavItem onClick={this.handleLogin.bind(this)} disabled={isLoading}>
        Log in
      </NavItem>;

    return (
      <Navbar inverse>
        <NavbarHeader />
        <Navbar.Collapse>
          <Nav pullRight>
            {loginButton}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

AppMenu.propTypes = {
  isAuthenticated: propTypes.bool,
  isInvalidated: propTypes.bool,
  isLoading: propTypes.bool,
  currentUser: propTypes.object
};

const mapStateToProps = state => {
  const { user } = state;
  const { isInvalidated, isAuthenticated, isLoading } = user;
  return {
    isInvalidated,
    isAuthenticated,
    isLoading,
    currentUser: user.user,
  }
};

const mapDispatchToProps = dispatch => ({
  sampleActions: bindActionCreators(sampleActions, dispatch),
  statsActions: bindActionCreators(statsActions, dispatch),
  tokenActions: bindActionCreators(tokenActions, dispatch),
  userActions: bindActionCreators(userActions, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppMenu));
