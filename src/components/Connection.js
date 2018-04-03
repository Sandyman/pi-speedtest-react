import React from 'react';
import { Grid, Panel, Row } from 'react-bootstrap';
import AppMenu from '../containers/AppMenu';
import LastSample from '../containers/LastSample';
import Statistics from '../containers/Statistics';

const Connection = () => (
  <div>
    <AppMenu/>
    <Grid bsClass="container">
      <h2>Connection</h2>
      <Row><br/></Row>
      <Row>
        <Panel bsStyle="primary">
          <LastSample/>
        </Panel>
      </Row>
      <Row>
        <Panel bsStyle="primary">
          <Statistics/>
        </Panel>
      </Row>
    </Grid>
  </div>
);

export default Connection;
