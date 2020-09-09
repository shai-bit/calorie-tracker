import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Dashboard extends Component {
  renderContent(props) {
    switch (props.auth) {
      case null:
        return;
      case false:
        return <Redirect to="/" />;
      default:
        return `Welcome back ${props.auth.name}!`;
    }
  }
  render() {
    return <h1>{this.renderContent(this.props)}</h1>;
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps, {})(Dashboard);
