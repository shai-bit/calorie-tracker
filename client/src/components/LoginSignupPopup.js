import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import './LoginSignupPopup.css';

const LoginSignupPopup = (props) => {
  const [loginForm, setloginForm] = useState({ email: '', password: '' });
  const [signUpForm, setSignUpForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const isVisible = props.popup.isVisible === true ? ' visible' : '';
  const rightPanelActive =
    props.popup.rightPanelActive === true ? ' right-panel-active' : '';

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(loginForm);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log(signUpForm);
  };

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
          <form onSubmit={handleLogin}>
            <h1>Login</h1>
            <input
              type="email"
              placeholder="Email"
              value={loginForm.email}
              onChange={(e) =>
                setloginForm({ ...loginForm, email: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Password"
              value={loginForm.password}
              onChange={(e) =>
                setloginForm({ ...loginForm, password: e.target.value })
              }
            />
            <button type="submit">Login</button>
            <a className="google-link" href="/auth/google">
              <i className="fab fa-google"></i>Login with Google
            </a>
          </form>
        </div>
        <div className="popup__form signup">
          <form onSubmit={handleSignUp}>
            <h1>Create an account</h1>
            <input
              type="text"
              placeholder="Name"
              value={signUpForm.name}
              onChange={(e) =>
                setSignUpForm({ ...signUpForm, name: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Email"
              value={signUpForm.email}
              onChange={(e) =>
                setSignUpForm({ ...signUpForm, email: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Password"
              value={signUpForm.password}
              onChange={(e) =>
                setSignUpForm({ ...signUpForm, password: e.target.value })
              }
            />
            <button>Sign up</button>
            <a className="google-link" href="/auth/google">
              <i className="fab fa-google"></i>Sign up with Google
            </a>
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

export default connect(mapStateToProps, actions)(LoginSignupPopup);