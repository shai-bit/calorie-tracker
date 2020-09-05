import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Navbar from './Navbar';
import Welcome from './Welcome';
import Dashboard from './Dashboard';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <Route exact path="/" component={Welcome} />
        <Route exact path="/dashboard" component={Dashboard} />
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
