import React, { useState } from "react";
import "./LoginSignupPopup.css";

const LoginSignupPopup = () => {
  const [activePopup, setActivePopup] = useState("popup ");
  const [visibility, setVisibility] = useState("visible");

  return (
    <div
      onClick={() => {
        setVisibility("hidden");
      }}
      className={activePopup.concat(visibility)}
    >
      <div onClick={(e) => e.preventDefault()} className="popup__container">
        <div className="popup__form login">
          <form>
            <h1>Login</h1>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>Login</button>
            <button className="google">
              <i class="fab fa-google"></i>
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
            <button className="google">
              <i class="fab fa-google"></i>
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
                onClick={() => {
                  setActivePopup("popup ");
                }}
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
                onClick={() => {
                  setActivePopup("popup right-panel-active ");
                }}
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

export default LoginSignupPopup;
