import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../firebase.config";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import OAuth from "../components/OAuth";
function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  // On form submission:

  const onSubmit = async (e) => {
    e.preventDefault();

    // // Registering the user with the create with email passowrd func. from firebase
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      updateProfile(auth.currentUser, {
        displayName: name,
      });

      // Storing the Data to Firebase Storeage DB that we created:
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();
      await setDoc(doc(db, "users", user.uid), formDataCopy);
      toast.success("Successfully Signed Up");
      // Naviagate to home page once succefully store the user to the DB:
      navigate("/");
    } catch (error) {
      toast.error("Something Went Wrong While Registeration. Please Try Again.");
    }
  };

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back</p>
        </header>
        <form onSubmit={onSubmit}>
          <input
            className="emailInput"
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            value={name}
            onChange={onChange}
          />
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
          <div className="signUpBar">
            <p className="signUpText">Sign Up</p>

            <button className="signUpButton" type="submit">
              <ArrowRightIcon
                height="34px"
                width="36px"
                fill="#fff"
              ></ArrowRightIcon>
            </button>
          </div>
        </form>
        {/* Goole OAuth */}
        <OAuth></OAuth>
        <Link to="/sign-in" className="registerLink">
          Existing Users? Please Sign In ...
        </Link>
      </div>
    </>
  );
}

export default SignUp;
