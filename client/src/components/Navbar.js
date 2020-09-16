import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import './Navbar.css';

import calorifyLogo from '../resources/calorify-logo.svg';

class Navbar extends Component {
  // static spaced = props.auth
  setHome(props) {
    switch (props.auth) {
      case null:
        return '/';
      case false:
        return '/';
      default:
        return '/dashboard';
    }
  }

  renderLinks(props) {
    switch (props.auth) {
      // Loading
      case null:
        return;
      //Not logged in
      case false:
        return (
          <React.Fragment>
            <div className="underbar-one solo">
              <button
                onClick={() => props.loginPopup()}
                className="navbar__button login"
              >
                Login
              </button>
            </div>
            <button
              onClick={() => props.signupPopup()}
              className="navbar__button signup"
            >
              Sign up
            </button>
          </React.Fragment>
        );
      // Logged in
      default:
        return (
          <div className="underbar-one">
            <a href="/api/logout">
              <button className="navbar__button logout">Log out</button>
            </a>
          </div>
        );
    }
  }

  render() {
    const spaced =
      this.props.auth === false ? '' : this.props.auth === null ? '' : 'spaced';
    return (
      <nav className="navbar">
        <div className={`navbar__holder home ${spaced}`}>
          <img className="navbar__logo" src={calorifyLogo} alt="logo" />
          <Link className="navbar__link" to={this.setHome(this.props)}>
            <button className="navbar__button logo">Calorify</button>
          </Link>
        </div>
        <div className={`navbar__holder account ${spaced}`}>
          {this.renderLinks(this.props)}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return { popup: state.popup, auth: state.auth, login: state.login };
};

export default connect(mapStateToProps, actions)(Navbar);
