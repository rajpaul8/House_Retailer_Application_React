import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
function SignIn() {
  const [formData, setFormData] = useState({email:'',password:''});
  const { email, password } = formData;
  const [showPassword, setShowPassword] = useState(true);
  const naviagte = useNavigate();
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back</p>
        </header>
        <form>
          <input
            className="emailInput"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={onChange}
          />
          <div className="passwordInputDiv">
            <input
              className="passwordInput"
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={onChange}
            />
            <img
              src={visibilityIcon}
              alt="show-password"
              className="showPassword"
              onClick={() => setShowPassword((prevState) => !prevState)}
            />
          </div>
          <Link to="/forgot-password" className="forgotPasswordLink">
            Forgot Password
          </Link>
          <div className="signInBar">
            <p className="signInText">Sign In</p>
            <button className="signInButton">
              <ArrowRightIcon
                height="34px"
                width="36px"
                fill="#fff"
              ></ArrowRightIcon>
            </button>
          </div>
        </form>
        <Link to="/sign-up" className="registerLink">
          Sign Up Instead
        </Link>
      </div>
    </>
  );
}

export default SignIn;
