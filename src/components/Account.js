import React from 'react';
import { Grid, Row } from 'react-bootstrap';
import AppMenu from '../containers/AppMenu';
import Token from './Token'

const Account = () => (
  <Grid bsClass="container">
    <Row>
      <AppMenu />
    </Row>
    <Row>
      <Token />
    </Row>
  </Grid>
);

export default Account;
