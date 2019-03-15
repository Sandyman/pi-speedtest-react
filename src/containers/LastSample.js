import React from 'react';
import { Alert, Col, Row } from 'react-bootstrap';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment';
import PanelHeader from '../components/PanelHeader';
import RefreshGlyphButton from '../components/RefreshGlyphButton';
import roundToMaxThreeDecimals from '../util/round';

const GET_LAST_SAMPLE = gql`
{
  getLastSample {
    timestamp
    download
    upload
    ping
    isp
    location
    country
  }
}
`;

const LastSample = () => (
  <Query query={GET_LAST_SAMPLE} fetchPolicy="cache-and-network">
    {({ loading, error, data, refetch }) => {
      const panelHeader = <PanelHeader
        title="Most recent results"
        subTitle="Results of the last measurement taken"
      >
        &nbsp;&nbsp;
        <RefreshGlyphButton
          loading={loading}
          handleClick={() => refetch()}
        />
      </PanelHeader>;

      if (error) return (
        <div>
          {panelHeader}
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

      const { timestamp, download, upload, ping, isp, location, country } = data.getLastSample || {};

      const dl = withLoading(formattedNum(download));
      const ul = withLoading(formattedNum(upload));
      const pg = withLoading(formattedNum(ping));
      
      const formattedTime = moment(timestamp).format('YYYY-MM-DD HH:mm:ss');

      const provider = withLoading(isp);
      const city = withLoading(`${location} (${country})`);
      return (
        <div>
          {panelHeader}
          <div>
            <Row className='show-grid'>
              <Col smOffset={1} sm={2}><strong>Download (Mbps)</strong></Col>
              <Col sm={1} smOffset={0}>{dl}</Col>
              <Col smOffset={1} sm={2}><strong>Time</strong></Col>
              <Col sm={1} smOffset={0}>{formattedTime}</Col>
            </Row>
            <Row><br/></Row>
            <Row>
              <Col smOffset={1} sm={2}><strong>Upload (Mbps)</strong></Col>
              <Col sm={1} smOffset={0}>{ul}</Col>
              <Col smOffset={1} sm={2}><strong>Provider</strong></Col>
              <Col>{provider}</Col>
            </Row>
            <Row><br/></Row>
            <Row>
              <Col smOffset={1} sm={2}><strong>Ping (ms)</strong></Col>
              <Col sm={1} smOffset={0}>{pg}</Col>
              <Col smOffset={1} sm={2}><strong>City</strong></Col>
              <Col>{city}</Col>
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
