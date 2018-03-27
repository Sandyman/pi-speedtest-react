import React from 'react';
import { Col, Grid, Row, Well } from 'react-bootstrap';
import AppMenu from '../containers/AppMenu';
import Token from './Token'

const Account = () => (
  <Grid bsClass="container">
    <Row>
      <AppMenu />
    </Row>
    <Col>
      <h1>Account</h1>
    </Col>
    <Row>
      <br/>
    </Row>
    <Row>
      <Well>
        <Col smOffset={1}>
        <h3>Token</h3>
        <br/>
        </Col>
        <Token />
      </Well>
    </Row>
  </Grid>
);

export default Account;
