import React, { Component } from 'react';
import { Col, Grid, Panel, Row } from 'react-bootstrap';
import PanelHeader from '../components/PanelHeader';
import AppMenu from '../containers/AppMenu';
import Danger from '../containers/Danger';
import Token from './Token'
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
            <Panel bsStyle="primary">
              <PanelHeader
                title="User"
                subTitle="Everything about you"
              />
              <User />
              <br/>
            </Panel>
          </Row>
          <Row>
            <Panel bsStyle="primary">
              <PanelHeader
                title="Authentication"
                subTitle="So we know it's your data and not someone else's"
              />
              <Token />
              <br/>
            </Panel>
          </Row>
          <Row>
            <Panel bsStyle="primary">
              <PanelHeader
                title="Danger zone"
                subTitle="You can break things here if you're not careful"
              />
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
