import React, { useState, useEffect } from "react";
import "../CSS_CODE/LoginSignupCSS.css";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import NavbarloginSection from "../Navbar_Section/NavbarLoginSection";
import axios from "axios";

const LoginSignup = () => {

  const Navigator = useNavigate();
  const [isSignIn, setIsSignIn] = useState(true);
  const [Signinformdata, setSigninformdata] =useState({email:"", password:""});
  const [Signupformdata, setSignupformdata] = useState({username:"", email:"", gender:"", password:""});

  // Login and signup Theme Code
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSignIn(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  const toggle = () => {
    setIsSignIn(!isSignIn);
  };

  // Signin API Handler Section
  const SigninSubmitHandler = async (e) => {
    e.preventDefault();
    try{
      const SigninResponse = await axios.post(`http://localhost:5000/api/v1/auth/signin`, Signinformdata, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      console.log(SigninResponse.data);
      toast.success("Successfully Signin");
      Navigator("/homepage");
    }catch(error){
      console.log("Signin API Error: ", error.message);
      toast.error("Signin Failed");
    }
  }

  // Singup API Handler Section
  const SignupSubmitHandler = async (e) => {
    e.preventDefault();
    try{
      const SignupResponse = await axios.post(`http://localhost:5000/api/v1/auth/signup`, Signupformdata, {
        headers: {
          "Content-Type": "application/json"
        }
      })

      console.log(SignupResponse.data)
      toast.success("Signup Successfully")
      Navigator("/homepage")

    }catch(error){
      console.log(error.message)
      toast.error("Signup faild")
    }
  }

  return (
    <div>
      <NavbarloginSection />

      <div className={`auth-container ${isSignIn ? "sign-in" : "sign-up"}`}>
        {/* FORM SECTION */}
        <div className="auth-row">
          {/* SIGN UP */}
          <div className="auth-col align-center flex-col sign-up">
            <div className="form-wrapper align-center">
              <form className="form-wrapper align-center" onSubmit={SignupSubmitHandler} >
                <div className="auth-form sign-up">
                  <div className="input-group">
                    <input required name="username" value={Signupformdata.username} onChange={(e) => setSignupformdata({ ...Signupformdata, username: e.target.value })} type="text" placeholder="Username" />
                  </div>

                  <div className="input-group">
                    <input required name="email" value={Signupformdata.email} onChange={(e) => setSignupformdata({ ...Signupformdata, email: e.target.value })} type="email" placeholder="Email" />
                  </div>

                  <div className="input-group">
                    <input required name="gender" value={Signupformdata.gender} onChange={(e) => setSignupformdata({...Signupformdata, gender: e.target.value})} type="text" placeholder="Gender" />
                  </div>

                  <div className="input-group">
                    <input required name="password" value={Signupformdata.password} onChange={(e) => setSignupformdata({...Signupformdata, password:e.target.value})} type="password" placeholder="Password" />
                  </div>

                  <button type="Submit">Sign Up</button>

                  <p className="AlreadyhaveText">
                    Already have an account?{" "}
                    <b className="pointer" onClick={toggle}>
                      Sign in here
                    </b>
                  </p>
                </div>
              </form>

            </div>
          </div>

          {/* SIGN IN */}
          <form onSubmit={SigninSubmitHandler} className="auth-col align-center flex-col sign-in">
            <div className="auth-col align-center flex-col sign-in">
              <div className="form-wrapper align-center">
                <div className="auth-form sign-in">

                  <div className="input-group">
                    <input required name="email" value={Signinformdata.email} onChange={(e) => setSigninformdata({ ...Signinformdata, email: e.target.value })} type="text" placeholder="Email" />
                  </div>

                  <div className="input-group">
                    <input required name="password" value={Signinformdata.password} onChange={(e) => setSigninformdata({ ...Signinformdata, password: e.target.value })}   type="password" placeholder="Password" />
                  </div>

                  <button type="submit">Sign In</button>

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
          </form>
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
