import React from 'react';
import { Navbar } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

const NavbarHeader = () => (
  <Navbar.Header>
    <Navbar.Brand>
      <a href="/">Raspberry Pi Speedtest</a>
    </Navbar.Brand>
  </Navbar.Header>
);

export default withRouter(NavbarHeader);
