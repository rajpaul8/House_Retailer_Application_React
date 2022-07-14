import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import Spinner from "./Spinner";
// Outlet is the child Route i.e. Route inside another Route
/*
<Route to='profile' element ={<PrivateRoute/>}>
    <Route to = 'profile'  element ={<Profile/>}> {*This is child route*}</Route>
</Route>
*/

const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    return <Spinner></Spinner>;
  }

  return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
