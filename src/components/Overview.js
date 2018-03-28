import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Col, Grid, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { bindActionCreators } from "redux";
import Stats from './Stats';

import * as statsActions from '../actions/statsActions';

class Overview extends Component {
  handleRefresh() {
    this.props.statsActions.fetchStatsIfNeeded(true);
  }

  render() {
    const { isLoading, stats } = this.props;
    const { download, upload, ping } = stats || {
      download: {},
      upload: {},
      ping: {},
    };

    const tooltip = <Tooltip id="tooltip-right">
      Use this button to reload the statistics.
    </Tooltip>;

    return (
      <Grid>
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
        <Row>
          <Col smOffset={1}>
            <OverlayTrigger placement="right" overlay={tooltip}>
              <Button bsStyle="primary" className="pull-left" disabled={isLoading} onClick={this.handleRefresh.bind(this)}>Refresh</Button>
            </OverlayTrigger>
          </Col>
        </Row>
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  const { stats } = state;
  return {
    isLoading: stats.isLoading,
    stats: stats.stats,
  }
};

const mapDispatchToProps = dispatch => ({
  statsActions: bindActionCreators(statsActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
