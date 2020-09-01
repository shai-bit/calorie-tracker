import React from "react";
import { connect } from "react-redux";
import { loginPopup, signupPopup } from "../actions";
import "./Navbar.css";

function renderLinks(isLoggedIn, props) {
  if (isLoggedIn === true) {
    return (
      <React.Fragment>
        <div className="underbar-one">
          <button className="navbar__button logout">Log out</button>
        </div>
        <div className="underbar-two">
          <button className="navbar__button settings">Account settings</button>
        </div>
      </React.Fragment>
    );
  } else {
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
  }
}

const Navbar = (props) => {
  return (
    <nav className="navbar">
      <div className="navbar__holder home">
        <button className="navbar__button logo">Calorify</button>
      </div>
      <div className="navbar__holder account">{renderLinks(false, props)}</div>
    </nav>
  );
};

const mapStateToProps = (state) => {
  return { popup: state.popup };
};

export default connect(mapStateToProps, { loginPopup, signupPopup })(Navbar);
