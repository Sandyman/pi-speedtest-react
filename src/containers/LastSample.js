import React from 'react';
import { Alert, Button, Col, Glyphicon, Row } from 'react-bootstrap';
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
  <Query query={GET_LAST_SAMPLE} fetchPolicy="cache-and-network">
    {({ loading, error, data, refetch }) => {
      const pageHeader = <Col smOffset={1}>
        <br/>
        <h3>
          Most recent results&nbsp;&nbsp;
          <Button bsSize="small" onClick={() => refetch()}>
            <Glyphicon glyph="glyphicon glyphicon-refresh"/>
          </Button>
        </h3>
        <br/>
      </Col>;

      if (error) return (
        <div>
          {pageHeader}
          <Row>
            <Col sm={8} smOffset={1}>
              <Alert bsStyle="danger">
                <h4>Snap!</h4>
                <p>
                  Something went wrong: {error.message}
                </p>
              </Alert>
            </Col>
          </Row>
        </div>
      );

      const formattedNum = (num) => <span className="stats-numbers">{roundToMaxThreeDecimals(num)}</span>;
      const withLoading = f => (loading ? 'Loading...' : f);

      const { download, upload, ping } = data.getLastSample || {};
      const dl = withLoading(formattedNum(download));
      const ul = withLoading(formattedNum(upload));
      const pg = withLoading(formattedNum(ping));

      return (
        <div>
          {pageHeader}
          <div>
            <Row className='show-grid'>
              <Col smOffset={1} sm={2}>
                <strong>Download (Mbps)</strong>
              </Col>
              <Col sm={2} smOffset={0}>
                {dl}
              </Col>
            </Row>
            <Row><br/></Row>
            <Row>
              <Col smOffset={1} sm={2}>
                <strong>Upload (Mbps)</strong>
              </Col>
              <Col sm={2} smOffset={0}>
                {ul}
              </Col>
            </Row>
            <Row><br/></Row>
            <Row>
              <Col smOffset={1} sm={2}>
                <strong>Ping (ms)</strong>
              </Col>
              <Col sm={2} smOffset={0}>
                {pg}
              </Col>
            </Row>
            <Row><br/></Row>
          </div>
          <br/>
        </div>
      );
    }}
  </Query>
);

export default LastSample;
