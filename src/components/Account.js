import React, { Component } from 'react';
import { Col, Grid, Panel, Row } from 'react-bootstrap';
import AppMenu from '../containers/AppMenu';
import Danger from '../containers/Danger';
import Token from '../containers/Token'
import User from './User';

class Account extends Component {
  render() {
    return (
      <div>
        <AppMenu />
        <Grid bsClass="container">
          <h2>Account</h2>
          <Row><br/></Row>
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
                <br/><h3>Authentication</h3><br/>
              </Col>
              <Token />
              <br/>
            </Panel>
          </Row>
          <Row>
            <Panel>
              <Col smOffset={1}>
                <br/><h3>Danger zone</h3><br/>
              </Col>
              <Danger />
              <Col><br/><br/></Col>
            </Panel>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Account;
