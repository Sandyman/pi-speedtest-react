import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';
import roundToMaxThreeDecimals from '../util/round';

class Stats extends Component {
  render() {
    const { title, stats } = this.props;
    const { min, max, mean, std } = stats;

    return (
      <div>
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
      </div>
    )
  }
}

Stats.propTypes = {
  stats: propTypes.object.isRequired,
  title: propTypes.string.isRequired,
};

export default Stats;
