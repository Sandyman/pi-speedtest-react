import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'react-bootstrap';
import Stats from './Stats';
import { fetchStats } from '../actions/statsActions';

class Overview extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(fetchStats());
  }
  render() {
    const { stats } = this.props;
    const { download, upload, ping } = stats || {
      download: {},
      upload: {},
      ping: {},
    };

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
  const { stats } = state.stats;
  return {
    stats,
  }
};

export default connect(mapStateToProps)(Overview);
