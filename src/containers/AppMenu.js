import React, { Component } from 'react';
import { MenuItem, Nav, Navbar, NavDropdown, NavItem } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import propTypes from 'prop-types';
import { decode } from 'jsonwebtoken';

import * as userActions from '../actions/userActions';

class AppMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectLogin: false,
    }
  }

  componentDidMount() {
    let jwtToken;
    if (sessionStorage) {
      jwtToken = sessionStorage.getItem('jwtToken');
      if (jwtToken) {
        const claims = decode(jwtToken);
        this.props.userActions.injectUser(claims);
      }
    }
  }

  handleLogin() {
    this.setState({
      redirectLogin: true,
    });
  }

  handleLogout() {
    this.props.userActions.logoutUser();
  }

  render() {
    const { isAuthenticated, isInvalidated, currentUser } = this.props;

    if (isInvalidated || this.state.redirectLogin) {
      return <Redirect to='/login' />
    }

    const loginButton = isAuthenticated ?
      <NavDropdown title={isAuthenticated ? currentUser.name : ''} id="basic-nav-dropdown">
        <MenuItem>Account</MenuItem>
        <MenuItem onClick={this.handleLogout.bind(this)}>Log Out</MenuItem>
      </NavDropdown>
      :
      <NavItem onClick={this.handleLogin.bind(this)}>
        Log in
      </NavItem>;

    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            Pi-Speedtest.net
          </Navbar.Brand>
        </Navbar.Header>
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

export default connect(mapStateToProps, mapDispatchToProps)(AppMenu);
