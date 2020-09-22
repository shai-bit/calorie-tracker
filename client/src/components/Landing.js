import React from 'react';
import { Link } from 'react-router-dom';
import LoginSignupPopup from './LoginSignupPopup';
import { connect } from 'react-redux';
import * as actions from '../actions';
import './Landing.css';

const Welcome = (props) => {
  const { auth } = props;
  const showJoinNow = auth === null ? '' : auth === false ? '' : 'hidden';
  // Hide link to dashboard if not logged in
  const showRedirect =
    auth === null ? 'hidden' : auth === false ? 'hidden' : '';
  return (
    <React.Fragment>
      <div className="welcome">
        <h1 className="msg">
          Calorie tracking made easy.
          <button
            onClick={() => props.signupPopup()}
            className={`joinnow-button ${showJoinNow}`}
          >
            Join now
          </button>
          <br />
          <Link className={`welcome__link ${showRedirect}`} to={'/dashboard'}>
            Go to dashboard
          </Link>
        </h1>
      </div>
      <LoginSignupPopup />
    </React.Fragment>
  );
};

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps, actions)(Welcome);
