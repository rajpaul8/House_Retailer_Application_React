import React from "react";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";

// Outlet is the child Route i.e. Route inside another Route
/*
<Route to='profile' element ={<PrivateRoute/>}>
    <Route to = 'profile'  element ={<Profile/>}> {*This is child route*}</Route>
</Route>
*/

const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    return <h3>Loading...</h3>;
  }

  return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;

