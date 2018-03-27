import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Col, Grid, Row } from 'react-bootstrap';

/**
 * This changes the numbers so that there are never more than three decimals shown.
 * @param n
 */
const roundToMaxThreeDecimals = (n) => {
  if (!n) return 0;

  const e = Math.min(2, Math.log10(n));
  const g = 2 - e;
  const f = Math.min(1000, Math.pow(10, Math.ceil(g)));
  return Math.round(n * f) / f;
};

class Stats extends Component {
  render() {
    const { title, stats } = this.props;
    const { min, max, mean, std } = stats;

    return (
      <Grid>
        <Row className='show-grid'>
          <Col smOffset={1} sm={2}>
            <strong>{title}</strong>
          </Col>
          <Col sm={2} smOffset={0}>
            Max: <span className="stats-numbers">{roundToMaxThreeDecimals(max)}</span>
          </Col>
          <Col sm={3}>
            Mean: <span className="stats-numbers">{roundToMaxThreeDecimals(mean)}</span>
            &nbsp;&nbsp;(σ = <span className="stats-numbers">{roundToMaxThreeDecimals(std)}</span>)
          </Col>
          <Col sm={2}>
            Min: <span className="stats-numbers">{roundToMaxThreeDecimals(min)}</span>
          </Col>
        </Row>
        <Row>
          <br/><br/>
        </Row>
      </Grid>
    )
  }
}

Stats.propTypes = {
  stats: propTypes.object.isRequired,
  title: propTypes.string.isRequired,
};

export default Stats;
