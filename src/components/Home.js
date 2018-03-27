import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import AppMenu from '../containers/AppMenu';

class Home extends Component {
  render() {
    return (
      <div>
        <AppMenu />
        <Grid bsClass="container">
          <h3>Nothing to see here. Yet.</h3>
        </Grid>
      </div>
    )
  }
}

export default Home;
