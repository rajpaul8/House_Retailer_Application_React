import React from "react";
// import SignIn from './SignIn'
import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";
function Profile() {
  const [user, setUser] = useState(null);
  const auth = getAuth();
  useEffect(() => {
    setUser(auth.currentUser);
    console.log(user);
  });
  return user?(
    <>
      <div className="pageContainer">
        <h1>Profile</h1>
        <h3>Welcome { user.displayName}!</h3>
      </div>
      {}
    </>
  ): <><h3>Please log in to view your profile</h3></>
}

export default Profile;
