import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route {...rest} render={(props) => (
    isAuthenticated
      ? <Component {...props} />
      : <Redirect exact to={{
        pathname: '/login',
        state: { from: props.location }
      }} />
  )} />
);

ProtectedRoute.propTypes = {
  // component: PropTypes.func.isRequired,
  isAuthenticated: propTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  const { user } = state;
  console.log(user);
  const { isAuthenticated, isLoading } = user;
  return {
    isAuthenticated: isAuthenticated || isLoading,
  }
};

export default connect(mapStateToProps)(ProtectedRoute);
