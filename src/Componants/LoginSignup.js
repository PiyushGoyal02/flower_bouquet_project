import React, { useState, useEffect } from "react";
import "../CSS_CODE/LoginSignupCSS.css";
import NavbarHomepage from "../Navbar_Section/NavbarHomepage";

const LoginSignup = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSignIn(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  const toggle = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <div>
      <NavbarHomepage />

      <div className={`auth-container ${isSignIn ? "sign-in" : "sign-up"}`}>
        {/* FORM SECTION */}
        <div className="auth-row">
          {/* SIGN UP */}
          <div className="auth-col align-center flex-col sign-up">
            <div className="form-wrapper align-center">
              <div className="auth-form sign-up">
                <div className="input-group">
                  <input type="text" placeholder="Username" />
                </div>

                <div className="input-group">
                  <input type="email" placeholder="Email" />
                </div>

                <div className="input-group">
                  <input type="password" placeholder="Password" />
                </div>

                <div className="input-group">
                  <input type="password" placeholder="Confirm Password" />
                </div>

                <button>Sign Up</button>

                <p className="AlreadyhaveText">
                  Already have an account?{" "}
                  <b className="pointer" onClick={toggle}>
                    Sign in here
                  </b>
                </p>
              </div>
            </div>
          </div>

          {/* SIGN IN */}
          <div className="auth-col align-center flex-col sign-in">
            <div className="form-wrapper align-center">
              <div className="auth-form sign-in">
                <div className="input-group">
                  <input type="text" placeholder="Username" />
                </div>

                <div className="input-group">
                  <input type="password" placeholder="Password" />
                </div>

                <button>Sign In</button>

                <p className="AlreadyhaveText">
                  <b>Forgot Password?</b>
                </p>

                <p className="AlreadyhaveText">
                  Don’t have an account?{" "}
                  <b className="pointer" onClick={toggle}>
                    Sign up here
                  </b>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT SECTION */}
        <div className="auth-row content-row">
          <div className="auth-col align-center flex-col">
            <div className="text sign-in">
              <h2>Welcome</h2>
              <p>Let’s spread love, one flower at a time.</p>
            </div>
          </div>

          <div className="auth-col align-center flex-col">
            <div className="text sign-up">
              <h2>Join with us</h2>
              <p>Create beautiful memories with flowers.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
