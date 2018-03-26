import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Grid, Row } from 'react-bootstrap';
import propTypes from 'prop-types';
import LineChart from './LineChart';
import AppMenu from '../containers/AppMenu';

import * as sampleActions from '../actions/sampleActions';

class Home extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    let jwtToken;
    if (sessionStorage) {
      jwtToken = sessionStorage.getItem('jwtToken');
      if (jwtToken) {
        dispatch(sampleActions.fetchSamplesIfNeeded(jwtToken));
      }
    }
  }

  render() {
    const { samples } = this.props;

    const chart = samples
      ? <LineChart
          samples={samples}
          options={{
            color: 'blue',
            xLabel: 'timestamp',
            yLabel: 'download',
            title: 'Download speed (Mbps)'
          }}
          width={700}
          height={360} />
      : null;

    return (
      <Grid bsClass="container">
        <Row>
          <AppMenu />
        </Row>
        <Row>
          <br/><br/><br/>
        </Row>
        <Row>
          {chart}
        </Row>
      </Grid>
    );
  }
}

Home.propTypes = {
  samples: propTypes.array,
};

const mapStateToProps = (state) => {
  const { data } = state;
  const { samples } = data;
  return {
    samples,
  }
};

export default connect(mapStateToProps)(Home);
