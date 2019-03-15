import React, { Component} from 'react';
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
  purple: [160,32,240],
  grey: [220,220,220],
};

const getColor = c => (colors[c]);
const withHue = h => c => {
  const cl = getColor(c).slice();
  cl.push(h);
  return cl.join(',');
};

const samplesToChartData = (mean, samples, { xLabel, yLabel, color, title }) => {
  const initialValue = {
    labels: [],
    samples: [],
  };

  const reduced = samples.reduce((acc, item) => {
    const x = item[xLabel];
    const y = item[yLabel];

    acc.labels.push(convertTimestamp(x));
    acc.samples.push(y);
    return acc;
  }, initialValue);


  const unit = title.match(new RegExp(/\((.*)\)/))[1];
  const meanLabel = `Mean (${mean} ${unit})`;
  return {
    labels: reduced.labels,
    datasets: [{
      label: title,
      fill: false,
      radius: 0,
      lineTension: 0.1,
      backgroundColor: `rgba(${withHue(0.6)(color)})`,
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
      data: reduced.samples,
    }, {
      label: meanLabel,
      fill: false,
      radius: 0,
      backgroundColor: `rgba(${withHue(0.3)(color)})`,
      borderColor: `rgba(${withHue(0.3)(color)})`,
      data: Array.apply(null, new Array(reduced.samples.length)).map(Number.prototype.valueOf, mean),
    }]
  }
};

const getChartOptions = ({ title, color }) => ({
  title: {
    display: false,
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
        color: `rgba(${withHue(0.3)(color)})`,
      },
      stacked: false,
      ticks: {
        maxTicksLimit: 10,
      },
    }],
    yAxes: [{
      gridLines: {
        color: `rgba(${withHue(0.3)(color)})`,
      },
      scalePositionLeft: true,
      stacked: false,
      position: "left",
      ticks: {
        suggestedMin: 0,
      },
    }]
  }
});

class LineChart extends Component {
  render() {
    const { mean, height, options, samples, width } = this.props;
    const chartData = samplesToChartData(mean, samples, options);
    const chartOptions = getChartOptions(options);
    return (
      <Line
        data={chartData}
        options={chartOptions}
        width={width}
        height={height} />
    );
  }
}

LineChart.propTypes = {
  mean: propTypes.number,
  height: propTypes.number,
  options: propTypes.object,
  samples: propTypes.array,
  width: propTypes.number,
};

export default LineChart;
