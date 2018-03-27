import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'react-bootstrap';
import Stats from './Stats';
import {bindActionCreators} from "redux";

import * as statsActions from "../actions/statsActions";

class Overview extends Component {
  render() {
    const { isAuthenticated, stats } = this.props;
    const { download, upload, ping } = stats || {
      download: {},
      upload: {},
      ping: {},
    };

    if (isAuthenticated) {
      this.props.statsActions.fetchStatsIfNeeded();
    }

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
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  const { stats, user } = state;
  const { isAuthenticated } = user;
  return {
    isAuthenticated,
    stats: stats.stats,
  }
};

const mapDispatchToProps = dispatch => ({
  statsActions: bindActionCreators(statsActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
