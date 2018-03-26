import React, { Component} from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { Line } from 'react-chartjs-2';

// 2018-03-22T05:17:52.350Z
const convertTimestamp = t => {
  const re = /^(\d+)-(\d+)-(\d+)T(\d+):(\d+):(\d+)\..*$/;
  const m = t.match(re);
  return `${m[3]}-${m[2]}-${m[1]}   ${m[4]}:${m[5]}`;
};

const colors = {
  blue: [33,36,199],
  red: [199,33,36],
  green: [33,199,36],
};

const getColor = c => (colors[c]);
const withHue = h => c => {
  const cl = getColor(c).slice();
  cl.push(h);
  return cl.join(',');
};

const samplesToChartData = (samples, { xLabel, yLabel, color, title }) => {
  const initialValue = {
    labels: [],
    downloads: [],
  };

  const reduced = samples.reduce((acc, item) => {
    const x = item[xLabel];
    const y = item[yLabel];

    acc.labels.push(convertTimestamp(x));
    acc.downloads.push(y);
    return acc;
  }, initialValue);

  return {
    labels: reduced.labels,
    datasets: [{
      label: title,
      fill: false,
      lineTension: 0.1,
      backgroundColor: `rgba(${withHue(0.4)(color)})`,
      borderColor: `rgba(${withHue(0.6)(color)})`,
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: `rgba(${withHue(1)(color)})`,
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: `rgba(${withHue(1)(color)})`,
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: reduced.downloads,
    }]
  }
};

const getChartOptions = ({ title, color }) => ({
  title: {
    display: true,
    text: `${title}`,
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
      gridLines: {
        color: `rgba(${withHue(0.4)(color)})`,
      },
      stacked: false
    }],
    yAxes: [{
      gridLines: {
        color: `rgba(${withHue(0.4)(color)})`,
      },
      scalePositionLeft: true,
      stacked: false,
      position: "left",
      ticks: {
        fontColor: `rgba(${withHue(0.4)(color)})`,
      },
    }]
  }
});

class LineChart extends Component {
  render() {
    const { options, samples } = this.props;
    const chartData = samplesToChartData(samples, options);
    const chartOptions = getChartOptions(options);
    return (
      <Line
        data={chartData}
        options={chartOptions}
        width={700}
        height={420} />
    );
  }
}

LineChart.propTypes = {
  samples: propTypes.array,
};

const mapStateToProps = (state) => {
  const { data } = state;
  const { samples } = data;
  return {
    samples,
  }
};

export default connect(mapStateToProps)(LineChart);
