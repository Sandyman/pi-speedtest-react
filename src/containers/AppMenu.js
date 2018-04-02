import React, { Component } from 'react';
import { MenuItem, Nav, Navbar, NavDropdown, NavItem } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import propTypes from 'prop-types';
import { decode } from 'jsonwebtoken';
import NavbarHeader from '../components/NavbarHeader';

import * as userActions from '../actions/userActions';

class AppMenu extends Component {
  constructor(props) {
    super(props);

    this.handleEvent = this.handleEvent.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    const { isAuthenticated } = this.props;

    if (!isAuthenticated) {
      let jwtToken;
      if (window.localStorage) {
        jwtToken = window.localStorage.getItem('jwtToken');
        if (jwtToken) {
          const claims = decode(jwtToken);
          this.props.userActions.injectUser(claims);
        }
      }
    }
  }

  handleEvent(e) {
    this.props.history.push(e);
  }

  handleLogout() {
    this.props.history.push('/');
    this.props.userActions.logoutUser();
  }

  render() {
    const { isAuthenticated, isLoading, currentUser } = this.props;

    const loginButton = isAuthenticated ?
      <NavDropdown title={isAuthenticated ? currentUser.name : ''} id="basic-nav-dropdown">
        <MenuItem onClick={() => this.handleEvent('/account')}>Account</MenuItem>
        <MenuItem divider />
        <MenuItem onClick={() => this.handleEvent('/connection')}>Connection</MenuItem>
        <MenuItem onClick={() => this.handleEvent('/charts')}>Charts</MenuItem>
        <MenuItem divider />
        <MenuItem onClick={this.handleLogout}>Log Out</MenuItem>
      </NavDropdown>
      :
      <NavItem onClick={() => this.handleEvent('/')} disabled={isLoading}>
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
  userActions: bindActionCreators(userActions, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppMenu));
