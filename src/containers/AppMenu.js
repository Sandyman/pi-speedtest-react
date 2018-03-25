import React, { Component } from 'react';
import { MenuItem, Nav, Navbar, NavDropdown, NavItem } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import propTypes from 'prop-types';
import { decode } from 'jsonwebtoken';
import NavbarHeader from '../components/NavbarHeader';

import * as userActions from '../actions/userActions';

class AppMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectAccount: false,
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

  handleAccount() {
    this.setState({
      redirectAccount: true,
    });
  }

  handleLogin() {
    this.setState({
      redirectLogin: true,
    });
  }

  handleLogout() {
    this.props.userActions.logoutUser();
    this.setState({
      redirectLogin: true,
    })
  }

  render() {
    const { isAuthenticated, isInvalidated, isLoading, currentUser } = this.props;

    if (this.state.redirectAccount) {
      return <Redirect exact to='/account' />
    }
    if (this.state.redirectLogin || isInvalidated) {
      return <Redirect exact to='/login' />
    }

    const loginButton = isAuthenticated ?
      <NavDropdown title={isAuthenticated ? currentUser.name : ''} id="basic-nav-dropdown">
        <MenuItem onClick={this.handleAccount.bind(this)}>Account</MenuItem>
        <MenuItem onClick={this.handleLogout.bind(this)}>Log Out</MenuItem>
      </NavDropdown>
      :
      <NavItem onClick={this.handleLogin.bind(this)} disabled={isLoading}>
        Log in
      </NavItem>;

    return (
      <Navbar>
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
  userActions: bindActionCreators(userActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AppMenu);
