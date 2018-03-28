import React from 'react';
import { Col, Grid, Panel, Row } from 'react-bootstrap';
import AppMenu from '../containers/AppMenu';
import Danger from './Danger';
import Overview from './Overview';
import Token from './Token'
import User from './User';

const Account = () => (
  <div>
    <AppMenu />
    <Grid bsClass="container">
      <h2>Account</h2>
      <br/><br/>
      <Row>
        <Panel>
          <Col smOffset={1}>
            <br/><h3>User</h3><br/>
          </Col>
          <User />
          <br/>
        </Panel>
      </Row>
      <Row>
        <Panel>
          <Col smOffset={1}>
            <br/><h3>Token</h3><br/>
          </Col>
          <Token />
          <br/>
        </Panel>
      </Row>
      <Row>
        <Panel>
          <Col smOffset={1}>
            <br/><h3>Connection statistics</h3><br/>
          </Col>
          <Overview />
          <br/>
        </Panel>
      </Row>
      <Row>
        <Panel>
          <Col smOffset={1}>
            <br/><h3>Danger zone</h3><br/>
          </Col>
          <Danger />
          <br/>
        </Panel>
      </Row>
    </Grid>
  </div>
);

export default Account;
