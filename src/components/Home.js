import React, { Component } from 'react';
import _ from 'underscore';
import { connect } from 'react-redux'
import { Button, ButtonToolbar, Grid, Row } from 'react-bootstrap';
import propTypes from 'prop-types';
import LineChart from './LineChart';
import AppMenu from '../containers/AppMenu';

import * as sampleActions from '../actions/sampleActions';

class Home extends Component {
  render() {
    const { dispatch, isAuthenticated, samples } = this.props;
    if (isAuthenticated) {
      dispatch(sampleActions.fetchSamplesIfNeeded());
    }

    const samplesAvailable = samples && !_.isEmpty(samples);

    const empty = !samplesAvailable
    ? <Row>
        <h3>Nothing to see here.</h3>
      </Row>
    : null;

    const downloadChart = samplesAvailable
      ? <Row>
        <LineChart
          samples={samples}
          options={{
            color: 'blue',
            xLabel: 'timestamp',
            yLabel: 'download',
            title: 'Download speed (Mbps)'
          }}
          width={700}
          height={360} />
        </Row>
      : null;
    const uploadChart = samplesAvailable
      ? <Row>
        <LineChart
          samples={samples}
          options={{
            color: 'purple',
            xLabel: 'timestamp',
            yLabel: 'upload',
            title: 'Upload speed (Mbps)'
          }}
          width={700}
          height={360} />
        </Row>
      : null;
    const pingChart = samplesAvailable
      ? <Row>
        <LineChart
          samples={samples}
          options={{
            color: 'red',
            xLabel: 'timestamp',
            yLabel: 'ping',
            title: 'Ping delay (ms)'
          }}
          width={700}
          height={360} />
        </Row>
      : null;

    const button = samplesAvailable
    ? <Row>
        <br/><br/><br/>
        <ButtonToolbar>
          <Button bsStyle='primary'>Refresh</Button>
        </ButtonToolbar>
      </Row>
    : null;

    return (
      <Grid bsClass="container">
        <Row>
          <AppMenu />
        </Row>
        {empty}
        {button}
        {downloadChart}
        {uploadChart}
        {pingChart}
      </Grid>
    );
  }
}

Home.propTypes = {
  isAuthenticated: propTypes.bool,
  isLoading: propTypes.bool,
  samples: propTypes.array,
};

const mapStateToProps = (state) => {
  const { data, user } = state;
  const { samples } = data;
  const { isAuthenticated } = user;
  return {
    isAuthenticated,
    samples,
  }
};

export default connect(mapStateToProps)(Home);
