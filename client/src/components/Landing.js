import React from 'react';
import LoginSignupPopup from './LoginSignupPopup';
import { connect } from 'react-redux';
import * as actions from '../actions';
import './Landing.css';

const Welcome = (props) => {
  return (
    <React.Fragment>
      <div className="welcome">
        <h1 className="msg">
          Calorie tracking made easy.
          <button
            onClick={() => props.signupPopup()}
            className="joinnow-button"
          >
            Join now
          </button>
        </h1>
      </div>
      <LoginSignupPopup />
    </React.Fragment>
  );
};

export default connect(null, actions)(Welcome);
