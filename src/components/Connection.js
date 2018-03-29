import React, { Component } from 'react';
import { Button, Col, Grid, OverlayTrigger, Panel, Row, Tooltip } from 'react-bootstrap';
import AppMenu from '../containers/AppMenu';
import LastSample from './LastSample';
import Stats from './Stats';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as statsActions from "../actions/statsActions";

class Connection extends Component {
  componentDidMount() {
    this.props.statsActions.fetchStatsIfNeeded();
  }

  handleRefresh() {
    this.props.statsActions.fetchStatsIfNeeded(true);
  }

  render() {
    const { isLoading, mostRecent, statistics } = this.props;
    const { download, upload, ping } = statistics || {
      download: {},
      upload: {},
      ping: {},
    };

    const tooltip = <Tooltip id="tooltip-right">
      Use this button to reload the statistics.
    </Tooltip>;

    return (
      <div>
        <AppMenu/>
        <Grid bsClass="container">
          <h2>Connection</h2>
          <Row>
            <Col smOffset={1}>
              <OverlayTrigger placement="right" overlay={tooltip}>
                <Button
                  bsStyle="primary"
                  className="pull-right"
                  disabled={isLoading}
                  onClick={this.handleRefresh.bind(this)}>Refresh</Button>
              </OverlayTrigger>
            </Col>
          </Row>
          <Row><br/></Row>
          <Row>
            <Panel>
              <Col smOffset={1}>
                <br/><h3>Most recent results</h3><br/>
              </Col>
              <LastSample
                sample={mostRecent}
              />
              <br/>
            </Panel>
          </Row>
          <Row>
            <Panel>
              <Col smOffset={1}>
                <br/><h3>Connection statistics</h3><br/>
              </Col>
              <div>
                <Stats
                  title={'Download (Mbps)'}
                  stats={download}
                />
                <Stats
                  title={'Upload (Mbps)'}
                  stats={upload}
                />
                <Stats
                  title={'Ping (ms)'}
                  stats={ping}
                />
              </div>
              <br/>
            </Panel>
          </Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { stats } = state;
  return {
    isLoading: stats.isLoading,
    mostRecent: stats.recent,
    statistics: stats.stats,
  }
};

const mapDispatchToProps = dispatch => ({
  statsActions: bindActionCreators(statsActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Connection);
