import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import popupWindow from '../util/openWindow';
import * as userActions from '../actions/userActions';

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

class AppMenu extends Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            Pi-Speedtest.net
          </Navbar.Brand>
        </Navbar.Header>
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
