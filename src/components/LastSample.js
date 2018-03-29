import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import roundToMaxThreeDecimals from '../util/round';

const GET_LAST_SAMPLE = gql`
{
  getLastSample {
    download
    upload
    ping
  }
}
`;

const LastSample = () => (
  <Query query={GET_LAST_SAMPLE}>
    {({ loading, error, data }) => {
      if (loading) return (
        <div>
          <Row className='show-grid'>
            <Col smOffset={1} sm={2}>
              Loading...
            </Col>
          </Row>
        </div>
      );
      if (error) return `Error! ${error.message}`;

      const { download, upload, ping } = data.getLastSample;
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
      );
    }}
  </Query>
);

export default LastSample;
