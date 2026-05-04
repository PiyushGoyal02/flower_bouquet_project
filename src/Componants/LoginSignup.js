import React, { useState } from "react";
import "../CSS_CODE/LoginSignupCSS.css";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/ui/shared/mini-navbar";
import LoginCarousel from "../components/ui/auth/login-carousel";
import axios from "axios";

const LoginSignup = () => {
  const Navigator = useNavigate();
  const [isSignIn, setIsSignIn] = useState(true);
  const [Signinformdata,  setSigninformdata]  = useState({ email: "", password: "" });
  const [Signupformdata,  setSignupformdata]  = useState({ username: "", email: "", gender: "", password: "" });

  const toggle = () => setIsSignIn(!isSignIn);

  /* ── Sign In ── */
  const SigninSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8000/api/v1/auth/signin`, Signinformdata, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(res.data);
      toast.success("Successfully Signed In");
      Navigator("/homepage");
    } catch (err) {
      console.log("Signin error:", err.message);
      toast.error("Sign In Failed");
    }
  };

  /* ── Sign Up ── */
  const SignupSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8000/api/v1/auth/signup`, Signupformdata, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(res.data);
      toast.success("Account Created Successfully");
      Navigator("/homepage");
    } catch (err) {
      console.log("Signup error:", err.message);
      toast.error("Sign Up Failed");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="auth-page-wrapper">

        {/* ── Left: Form panel ── */}
        <div className="auth-form-panel">
          <div className="auth-form-box">

            {/* Brand */}
            <div className="auth-brand">
              <span className="auth-brand-icon">🌸</span>
              <span className="auth-brand-name">Bouquet D'Amour</span>
            </div>

            {isSignIn ? (
              /* ─ Sign In ─ */
              <>
                <h2 className="auth-heading">Welcome Back</h2>
                <p className="auth-subheading">Sign in to your account to continue</p>

                <form onSubmit={SigninSubmitHandler}>
                  <div className="auth-input-group">
                    <input
                      required type="email" placeholder="Email address"
                      name="email" value={Signinformdata.email}
                      onChange={(e) => setSigninformdata({ ...Signinformdata, email: e.target.value })}
                    />
                  </div>
                  <div className="auth-input-group">
                    <input
                      required type="password" placeholder="Password"
                      name="password" value={Signinformdata.password}
                      onChange={(e) => setSigninformdata({ ...Signinformdata, password: e.target.value })}
                    />
                  </div>

                  <div className="auth-forgot">
                    <span>Forgot Password?</span>
                  </div>

                  <button type="submit" className="auth-submit-btn">Sign In</button>

                  <p className="auth-toggle-text">
                    Don't have an account?{" "}
                    <span className="auth-toggle-link" onClick={toggle}>Sign up here</span>
                  </p>
                </form>
              </>
            ) : (
              /* ─ Sign Up ─ */
              <>
                <h2 className="auth-heading">Create Account</h2>
                <p className="auth-subheading">Join and discover beautiful bouquets</p>

                <form onSubmit={SignupSubmitHandler}>
                  <div className="auth-input-group">
                    <input
                      required type="text" placeholder="Username"
                      name="username" value={Signupformdata.username}
                      onChange={(e) => setSignupformdata({ ...Signupformdata, username: e.target.value })}
                    />
                  </div>
                  <div className="auth-input-group">
                    <input
                      required type="email" placeholder="Email address"
                      name="email" value={Signupformdata.email}
                      onChange={(e) => setSignupformdata({ ...Signupformdata, email: e.target.value })}
                    />
                  </div>
                  <div className="auth-input-group">
                    <input
                      required type="text" placeholder="Gender"
                      name="gender" value={Signupformdata.gender}
                      onChange={(e) => setSignupformdata({ ...Signupformdata, gender: e.target.value })}
                    />
                  </div>
                  <div className="auth-input-group">
                    <input
                      required type="password" placeholder="Password"
                      name="password" value={Signupformdata.password}
                      onChange={(e) => setSignupformdata({ ...Signupformdata, password: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="auth-submit-btn">Sign Up</button>

                  <p className="auth-toggle-text">
                    Already have an account?{" "}
                    <span className="auth-toggle-link" onClick={toggle}>Sign in here</span>
                  </p>
                </form>
              </>
            )}
          </div>
        </div>

        {/* ── Right: Carousel panel ── */}
        <div className="auth-carousel-panel">
          <LoginCarousel />
        </div>

      </div>
    </div>
  );
};

export default LoginSignup;
