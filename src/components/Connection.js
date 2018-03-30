import React from 'react';
import { Grid, Panel, Row } from 'react-bootstrap';
import AppMenu from '../containers/AppMenu';
import LastSample from './LastSample';
import Statistics from './Statistics';

const Connection = () => (
  <div>
    <AppMenu/>
    <Grid bsClass="container">
      <h2>Connection</h2>
      <Row><br/></Row>
      <Row>
        <Panel>
          <LastSample/>
        </Panel>
      </Row>
      <Row>
        <Panel>
          <Statistics/>
        </Panel>
      </Row>
    </Grid>
  </div>
);

export default Connection;
