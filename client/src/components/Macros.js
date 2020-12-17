import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import './Macros.css';

const Macros = (props) => {
  return <div className="macros">Macros</div>;
};

const mapStateToProps = (state) => {
  return {
    fetchedPosts: state.fetchedPosts,
    auth: state.auth,
    date: state.date,
  };
};

export default connect(mapStateToProps, actions)(Macros);
