import React, { Component } from 'react';
import { connect } from 'react-redux'
import AppMenu from '../containers/AppMenu';
import { Grid, Row } from 'react-bootstrap';
import { Line as LineChart } from 'react-chartjs-2';

import * as sampleActions from '../actions/sampleActions';

// 2018-03-22T05:17:52.350Z
const convertTimestamp = t => {
  const re = /^(\d+)-(\d+)-(\d+)T(\d+):(\d+):(\d+)\..*$/;
  const m = t.match(re);
  return `${m[3]}-${m[2]}-${m[1]}   ${m[4]}:${m[5]}`;
};

const samplesToChartData = (samples) => {
  const initialValue = {
    labels: [],
    downloads: [],
    uploads: [],
    pings: [],
  };
  const reduced = samples.reduce((acc, item) => {
    const { timestamp, download, upload, ping } = item;

    acc.labels.push(convertTimestamp(timestamp));
    acc.downloads.push(download);
    acc.uploads.push(upload);
    acc.pings.push(ping);
    return acc;
  }, initialValue);

  return {
    labels: reduced.labels,
    datasets: [{
      yAxisID: 'y-axis-0',
      id: 'y-axis-0',
      label: 'Download speed (Mbps)',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(33,35,199,0.4)',
      borderColor: 'rgba(33,35,199,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(33,35,199,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(33,35,199,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: reduced.downloads,
    },
    {
      yAxisID: 'y-axis-0',
      id: 'y-axis-0',
      label: 'Upload speed (Mbps)',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(121,123,221,0.4)',
      borderColor: 'rgba(121,123,221,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(121,123,221,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(121,123,221,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: reduced.uploads,
    }, {
      yAxisID: 'y-axis-1',
      id: 'y-axis-1',
      label: 'Ping time (ms)',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(225,29,29,0.4)',
      borderColor: 'rgba(225,29,29,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(225,29,29,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(225,29,29,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: reduced.pings,
    }]
  }
};

const chartOptions = {
  title: {
    display: true,
    text: 'Download & Upload speeds'
  },

  bezierCurve : true,

  //Number - Tension of the bezier curve between points
  bezierCurveTension : 0.4,

  //Boolean - Whether to show a dot for each point
  pointDot : true,

  //Number - Radius of each point dot in pixels
  pointDotRadius : 4,

  //Number - Pixel width of point dot stroke
  pointDotStrokeWidth : 1,

  // maintainAspectRatio: false,

  scales: {
    xAxes: [{
      stacked: false
    }],
    yAxes: [{
      scalePositionLeft: true,
      stacked: false,
      position: "left",
      ticks: {
        fontColor: 'rgba(33,35,199,1)',
      },
      id: "y-axis-0",
    }, {
      scalePositionLeft: false,
      stacked: false,
      position: "right",
      ticks: {
        fontColor: 'rgba(225,29,29,1)',
        min: 0,
      },
      id: "y-axis-1",
    }]
  }
};

class Home extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    let jwtToken;
    if (sessionStorage) {
      jwtToken = sessionStorage.getItem('jwtToken');
      if (jwtToken) {
        dispatch(sampleActions.fetchSamples(jwtToken));
      }
    }
  }

  render() {
    const { samples } = this.props;

    let chartData;
    if (samples) {
      chartData = samplesToChartData(samples);
    }
    const chart = samples
      ? <LineChart
          data={chartData}
          options={chartOptions}
          width={700}
          height={420} />
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

};

const mapStateToProps = (state, ownProps) => {
  const { data } = state;
  const { samples } = data;
  return {
    samples,
  }
};

export default connect(mapStateToProps)(Home);
