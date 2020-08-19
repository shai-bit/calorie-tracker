import React from "react";
import "./Header.css";

function renderLinks(isLoggedIn) {
  if (isLoggedIn === true) {
    return (
      <React.Fragment>
        <button className="navbar__button one">Log out</button>
        <button className="navbar__button settings">Account settings</button>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <button className="navbar__button one">Login</button>
        <button className="navbar__button signup">Sign up</button>
      </React.Fragment>
    );
  }
}

const Header = (props) => {
  return (
    <nav className="navbar">
      <div className="navbar__holder home">
        <button className="navbar__button logo">
          {/* <span role="img" aria-label="fire">
            🔥
          </span> */}
          Calorie tracker
        </button>
      </div>
      <div className="navbar__holder account">{renderLinks(false)}</div>
    </nav>
  );
};

export default Header;
