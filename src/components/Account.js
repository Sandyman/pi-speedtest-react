import React from 'react';
import { Col, Grid, Panel, Row } from 'react-bootstrap';
import AppMenu from '../containers/AppMenu';
import Token from './Token'

const Account = () => (
  <div>
    <AppMenu />
    <Grid bsClass="container">
      <h2>Account</h2>
      <br/><br/>
      <Row>
        <Panel>
          <Col smOffset={1}>
            <h3>Token</h3>
            <br/>
          </Col>
        <Token />
        <br/>
      </Panel>
      </Row>
    </Grid>
  </div>
);

export default Account;
