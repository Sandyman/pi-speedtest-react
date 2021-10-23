import React, { Component } from 'react';
import _ from 'underscore';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import {
  Alert, Button, ButtonToolbar, Col, Collapse, Grid, Label, Nav, Navbar, NavItem, OverlayTrigger, Row, Tooltip
} from 'react-bootstrap';
import LineChart from './LineChart';
import AppMenu from './AppMenu';

const GET_SAMPLES = gql`
query {
  getSamples {
      upload
      download
      ping
      timestamp
  }
  getStats { 
    ping {
      mean 
    } 
    upload { 
      mean 
    } 
    download { 
      mean 
    } 
  }
}
`;

const Width = 600;
const Height = 320;

class ChartGql extends Component {
  constructor(props) {
    super(props);

    this.handleDismiss = this.handleDismiss.bind(this);

    this.state = {
      closeError: false,
    }
  }

  handleDismiss() {
    this.setState({
      closeError: true,
    })
  }

  render() {
    return (
      <Query query={GET_SAMPLES} fetchPolicy="cache-and-network">
        {({loading, error, data, refetch}) => {
          const tooltip = <Tooltip id="tooltip-right">Use this button to reload the sample data.</Tooltip>;

          const samples = data.getSamples;
          const samplesAvailable = samples && !_.isEmpty(samples);

          const stats = data.getStats;

          const emptyMsg = loading ? 'Loading data. Please wait...' : 'Nothing to see here.';
          const empty = !samplesAvailable ? <Row><h3>{emptyMsg}</h3></Row> : null;

          const errorPanel = error && !this.state.closeError
            ? <Row>
              <Col sm={6} smOffset={3}>
                <Collapse in={!!error} timeout={1500}>
                  <div>
                    <Alert bsStyle="danger" onDismiss={this.handleDismiss}>
                      <h4>Oops. Something went wrong!</h4>
                      <p>{error.message}</p>
                    </Alert>
                  </div>
                </Collapse>
              </Col>
            </Row>
            : null;

          const downloadChart = samplesAvailable
            ? <Row>
              <h3><Label bsStyle="primary">Download</Label></h3>
              <LineChart
                mean={Math.round(100 * stats.download.mean) / 100}
                samples={samples}
                options={{
                  color: 'blue',
                  xLabel: 'timestamp',
                  yLabel: 'download',
                  title: 'Download speed (Mbps)'
                }}
                width={Width}
                height={Height} />
            </Row>
            : null;

          const uploadChart = samplesAvailable
            ? <Row>
              <br/>
              <h3><Label bsStyle="primary">Upload</Label></h3>
              <LineChart
                mean={Math.round(100 * stats.upload.mean) / 100}
                samples={samples}
                options={{
                  color: 'purple',
                  xLabel: 'timestamp',
                  yLabel: 'upload',
                  title: 'Upload speed (Mbps)'
                }}
                width={Width}
                height={Height} />
            </Row>
            : null;

          const pingChart = samplesAvailable
            ? <Row>
              <br/>
              <h3><Label bsStyle="primary">Ping</Label></h3>
              <LineChart
                mean={Math.round(stats.ping.mean)}
                samples={samples}
                options={{
                  color: 'red',
                  xLabel: 'timestamp',
                  yLabel: 'ping',
                  title: 'Ping delay (ms)'
                }}
                width={Width}
                height={Height} />
            </Row>
            : null;

          const button =
            <div className="pull-right">
              <ButtonToolbar>
                <OverlayTrigger placement="right" overlay={tooltip}>
                  <Button bsStyle='primary' disabled={loading} onClick={() => {
                    this.setState({
                      closeError: false,
                    });
                    refetch();
                  }}>Refresh</Button>
                </OverlayTrigger>
              </ButtonToolbar>
              <br/><br/><br/>
            </div>;

          const subMenu =
            <Navbar>
              <Navbar.Header>
                <Navbar.Brand>
                  Charts
                </Navbar.Brand>
              </Navbar.Header>
              <Navbar.Collapse>
                <Nav>
                  <NavItem href="#download">Download</NavItem>
                  <NavItem href="#upload">Upload</NavItem>
                  <NavItem href="#ping">Ping</NavItem>
                </Nav>
              </Navbar.Collapse>
            </Navbar>;

          return (
            <div>
              <AppMenu />
              <Grid bsClass="container">
                {subMenu}
                <Row>&nbsp;</Row>
                {button}
                {errorPanel}
                {empty}
                <p name="download"> </p>
                {downloadChart}
                <p name="upload"> </p>
                {uploadChart}
                <p name="ping"> </p>
                {pingChart}
              </Grid>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default ChartGql;
