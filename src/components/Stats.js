import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';
import roundToMaxThreeDecimals from '../util/round';

class Stats extends Component {
  render() {
    const { title, min, max, mean, std, loading } = this.props;

    const formattedNum = (num) => <span className="stats-numbers">{roundToMaxThreeDecimals(num)}</span>;
    const withLoading = f => (loading ? 'Loading...' : f);

    const Max = withLoading(formattedNum(max));
    const Min = withLoading(formattedNum(min));
    const Mean = withLoading(formattedNum(mean));
    const formattedStd = <span>(σ = {formattedNum(std)})</span>;
    const Std = loading ? null : formattedStd;

    return (
      <div>
        <Row className='show-grid'>
          <Col smOffset={1} sm={2}>
            <strong>{title}</strong>
          </Col>
          <Col sm={2} smOffset={0}>{Max}</Col>
          <Col sm={3}>{Mean}&nbsp;&nbsp;{Std}</Col>
          <Col sm={2}>{Min}</Col>
        </Row>
        <Row>
          <br/><br/>
        </Row>
      </div>
    )
  }
}

Stats.propTypes = {
  loading: propTypes.bool,
  min: propTypes.number,
  max: propTypes.number,
  mean: propTypes.number,
  std: propTypes.number,
  title: propTypes.string.isRequired,
};

export default Stats;
