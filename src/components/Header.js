import React from "react";
import "./Header.css";

function renderLinks(isLoggedIn) {
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
          <button className="navbar__button login">Login</button>
        </div>
        <button className="navbar__button signup">Sign up</button>
      </React.Fragment>
    );
  }
}

const Header = (props) => {
  return (
    <nav className="navbar">
      <div className="navbar__holder home">
        <button className="navbar__button logo">Calorify</button>
      </div>
      <div className="navbar__holder account">{renderLinks(false)}</div>
    </nav>
  );
};

export default Header;
