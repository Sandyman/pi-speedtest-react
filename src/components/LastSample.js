import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';
import roundToMaxThreeDecimals from '../util/round';

class LastSample extends Component {
  render() {
    const { download, upload, ping } = this.props.sample || {};

    return (
      <div>
        <Row className='show-grid'>
          <Col smOffset={1} sm={2}>
            <strong>Download (Mbps)</strong>
          </Col>
          <Col sm={2} smOffset={0}>
            <span className="stats-numbers">{roundToMaxThreeDecimals(download)}</span>
          </Col>
        </Row>
        <Row><br/></Row>
        <Row>
          <Col smOffset={1} sm={2}>
            <strong>Upload (Mbps)</strong>
          </Col>
          <Col sm={2} smOffset={0}>
            <span className="stats-numbers">{roundToMaxThreeDecimals(upload)}</span>
          </Col>
        </Row>
        <Row><br/></Row>
        <Row>
          <Col smOffset={1} sm={2}>
            <strong>Ping (ms)</strong>
          </Col>
          <Col sm={2} smOffset={0}>
            <span className="stats-numbers">{roundToMaxThreeDecimals(ping)}</span>
          </Col>
        </Row>
        <Row><br/></Row>
      </div>
    )
  }
}

LastSample.propTypes = {
  sample: propTypes.object,
};

export default LastSample;
