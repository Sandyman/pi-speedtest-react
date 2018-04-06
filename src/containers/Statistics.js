import React from 'react';
import { Alert, Col, Row } from 'react-bootstrap';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PanelHeader from '../components/PanelHeader';
import RefreshGlyphButton from '../components/RefreshGlyphButton';
import Stats from '../components/Stats';

const GET_STATISTICS = gql`
{
  getStats { 
    ping {
      ...stats 
    } 
    upload { 
      ...stats 
    } 
    download { 
      ...stats 
    } 
  }
} 

fragment stats on Stat { 
  min 
  max 
  mean 
  std 
}
`;

const Statistics = () => (
  <Query query={GET_STATISTICS} fetchPolicy="cache-and-network">
    {({ loading, error, data, refetch }) => {
      const panelHeader = <PanelHeader
        title="Statistics"
        subTitle="It's nice if you're into numbers"
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

      const { download, upload, ping } = data.getStats || { download: {}, upload: {}, ping: {} };
      return (
        <div>
          {panelHeader}
          <div>
            <Row>
              <Col sm={2} smOffset={3}><strong>Max</strong></Col>
              <Col sm={3}><strong>Mean (std-dev)</strong></Col>
              <Col sm={2}><strong>Min</strong></Col>
            </Row>
            <Row>
              <br/>
            </Row>
            <Stats
              title={'Download (Mbps)'}
              min={download.min}
              max={download.max}
              mean={download.mean}
              std={download.std}
              loading={loading}
            />
            <Stats
              title={'Upload (Mbps)'}
              min={upload.min}
              max={upload.max}
              mean={upload.mean}
              std={upload.std}
              loading={loading}
            />
            <Stats
              title={'Ping (ms)'}
              min={ping.min}
              max={ping.max}
              mean={ping.mean}
              std={ping.std}
              loading={loading}
            />
          </div>
          <br/>
        </div>
      )
    }}
  </Query>
);

export default Statistics;
