import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './NotFound.css';

import LoginSignupPopup from './LoginSignupPopup';

const NotFound = (props) => {
  const [home, setHome] = useState(null);

  useEffect(() => {
    switch (props.auth) {
      case null:
        return;
      case false:
        return setHome('/');
      default:
        return setHome('/dashboard');
    }
  }, [props.auth]);

  return (
    <React.Fragment>
      <div className="not-found">
        <div className="not-found__message">
          <h1>404</h1>
          <h2>Sorry, page not found!</h2>
          <Link className="not-found__message--link" to={home}>
            Go back home
          </Link>
        </div>
      </div>
      <LoginSignupPopup />
    </React.Fragment>
  );
};

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps, {})(NotFound);
