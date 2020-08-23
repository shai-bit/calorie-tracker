import React from "react";
import LoginSignupPopup from "./LoginSignupPopup";
import "./Welcome.css";

const Welcome = () => {
  return (
    <React.Fragment>
      <div className="welcome">
        <h1 className="msg">Calorie tracking made easy.</h1>
      </div>
      <LoginSignupPopup />
    </React.Fragment>
  );
};

export default Welcome;
