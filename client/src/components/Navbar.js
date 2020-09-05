import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import './Navbar.css';

class Navbar extends Component {
  renderLinks(props) {
    switch (props.auth) {
      case null:
        return;
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

      default:
        return (
          <React.Fragment>
            <div className="underbar-one">
              <a href="/api/logout">
                <button className="navbar__button logout">Log out</button>
              </a>
            </div>
            <div className="underbar-two">
              <button className="navbar__button settings">
                Account settings
              </button>
            </div>
          </React.Fragment>
        );
    }
  }

  render() {
    return (
      <nav className="navbar">
        <div className="navbar__holder home">
          <button className="navbar__button logo">Calorify</button>
        </div>
        <div className="navbar__holder account">
          {this.renderLinks(this.props)}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return { popup: state.popup, auth: state.auth };
};

export default connect(mapStateToProps, actions)(Navbar);
