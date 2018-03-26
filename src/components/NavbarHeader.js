import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

class NavbarHeader extends Component {
  render() {
    return (
      <Navbar.Header>
        <Navbar.Brand onClick={() => this.props.history.push('/')}>
          Raspberry Pi Speedtest
        </Navbar.Brand>
      </Navbar.Header>
    );
  }
}

export default withRouter(NavbarHeader);
