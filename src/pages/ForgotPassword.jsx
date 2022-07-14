import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import { useState } from "react";
import { toast } from "react-toastify";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const onChange = (e) => {
    setEmail(e.target.value)
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth;
      await sendPasswordResetEmail(auth, email)
      toast.success('Email was sent!')
    } catch (error) {
      toast.error('Could not send reset email')
    }
  };
  return (
    <>
      <div className="pagecontainer">
        <header>
          <p className="pageHeader">Forgot Password</p>
        </header>
        <main>
          <form onSubmit={onSubmit}>
            <input
              type="email"
              placeholder="Email"
              id="email"
              value={email}
              onChange={onChange}
              className="emailInput"
            />
            <Link className="forgotPasswordLink" to="/sign-in">
              Sign In
            </Link>
            <div className="signInBar">
              <div className="signInText">Send Resend Link</div>
              <button className="signInButton">
                <ArrowRightIcon
                  width="34px"
                  height="34px"
                  fill="#fff"
                ></ArrowRightIcon>
              </button>
            </div>
          </form>
        </main>
      </div>
    </>
  );
}

export default ForgotPassword;
