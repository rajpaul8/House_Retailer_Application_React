import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import googleIcon from "../assets/svg/googleIcon.svg";

function OAuth() {
  const navigate = useNavigate();
  const location = useLocation();
  const onGoogleClick = async () => {
    try {
      const auth = getAuth();

      // Using Google Outh Provider
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check for user
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      // If user doesnt exist: Create User
      if (!docSnap.exists()) {
        await setDoc(doc(db, "user", user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      navigate("/");
      toast.success("Succefully Authorized With Google");
    } catch (error) {
      toast.error("Could Not Authorize With Google");
    }
  };
  return (
    <>
      <div className="socialLogin">
        <p>Sign {location.pathname === "/sign-up" ? "up" : "in"} with </p>
        <button className="socialIconDiv" onClick={onGoogleClick}>
          <img
            className="socialIconImg"
            src={googleIcon}
            alt="Google Oauth Icon"
          ></img>
        </button>
      </div>
      ;
    </>
  );
}

export default OAuth;
