import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

const WelcomeUser = (props) => {
  switch (props.auth) {
    case null:
      return null;
    case false:
      return <Redirect to="/" />;
    default:
      return (
        <h1 className="dashboard__header">
          Welcome back <span>{props.auth.name}</span>!
        </h1>
      );
  }
};

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps, actions)(WelcomeUser);
