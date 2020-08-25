import React from "react";
import { connect } from "react-redux";
import { loginPopup, signupPopup, hidePopup } from "../actions";
import "./LoginSignupPopup.css";

const LoginSignupPopup = (props) => {
  const isVisible = props.popup.isVisible === true ? " visible" : "";
  const rightPanelActive =
    props.popup.rightPanelActive === true ? " right-panel-active" : "";
  return (
    <div
      onClick={() => props.hidePopup()}
      className={`popup${rightPanelActive}${isVisible}`}
    >
      <div onClick={(e) => e.stopPropagation()} className="popup__container">
        <span onClick={() => props.hidePopup()} className="popup__close">
          &times;
        </span>
        <div className="popup__form login">
          <form>
            <h1>Login</h1>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>Login</button>
            <button className="google media">
              <i className="fab fa-google"></i>
              Login with Google
            </button>
          </form>
        </div>
        <div className="popup__form signup">
          <form>
            <h1>Create an account</h1>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>Signup</button>
            <button className="google media">
              <i className="fab fa-google"></i>
              Sign up with Google
            </button>
          </form>
        </div>
        <div className="popup__slides">
          <div className="slides">
            <div className="slides-panel panel-left">
              <h1>Welcome back!</h1>
              <p>Login if you already have an account</p>
              <button
                onClick={() => props.loginPopup()}
                className="ghost"
                id="login"
              >
                Login
              </button>
            </div>
            <div className="slides-panel panel-right">
              <h1>Don't have an account?</h1>
              <p>Enter your personal details and start tracking!</p>
              <button
                onClick={() => props.signupPopup()}
                className="ghost"
                id="signup"
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { popup: state.popup };
};

export default connect(mapStateToProps, { loginPopup, signupPopup, hidePopup })(
  LoginSignupPopup
);
