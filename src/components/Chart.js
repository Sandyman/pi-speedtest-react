import React, { Component } from 'react';
import _ from 'underscore';
import { connect } from 'react-redux'
import {
  Button, ButtonToolbar, Grid, OverlayTrigger, Row, Tooltip
} from 'react-bootstrap';
import propTypes from 'prop-types';
import LineChart from './LineChart';
import AppMenu from '../containers/AppMenu';

import * as sampleActions from '../actions/sampleActions';
import { bindActionCreators } from 'redux';

class Chart extends Component {
  componentDidMount() {
    this.props.sampleActions.fetchSamplesIfNeeded();
  }

  handleReload() {
    this.props.sampleActions.fetchSamplesIfNeeded(true);
  }

  render() {
    const { isLoading, samples } = this.props;

    const tooltip = <Tooltip id="tooltip-right">
      Use this button to reload the sample data.
    </Tooltip>;

    const samplesAvailable = samples && !_.isEmpty(samples);

    const emptyMsg = isLoading ? 'Loading data. Please wait...' : 'Nothing to see here.';
    const empty = !samplesAvailable
    ? <Row>
        <br/><br/><br/>
        <h3>{emptyMsg}</h3>
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
          width={600}
          height={320} />
        </Row>
      : null;

    const button = samplesAvailable
    ? <Row className="pull-right">
        <br/><br/><br/>
        <ButtonToolbar>
          <OverlayTrigger placement="right" overlay={tooltip}>
            <Button bsStyle='primary' disabled={isLoading} onClick={this.handleReload.bind(this)}>Refresh</Button>
          </OverlayTrigger>
        </ButtonToolbar>
        <br/><br/><br/>
      </Row>
    : null;

    return (
      <div>
        <AppMenu />
        <Grid bsClass="container">
          <h2>Charts</h2>
          {empty}
          {button}
          {downloadChart}
          {uploadChart}
          {pingChart}
        </Grid>
      </div>
    );
  }
}

Chart.propTypes = {
  isLoading: propTypes.bool,
  samples: propTypes.array,
};

const mapStateToProps = (state) => {
  const { data } = state;
  const { isLoading, samples } = data;
  return {
    isLoading,
    samples,
  }
};

const mapDispatchToProps = dispatch => ({
  sampleActions: bindActionCreators(sampleActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
