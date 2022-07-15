import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import Explore from "./pages/Explore";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/PrivateRoute";
import Category from "./pages/Category";
import Offers from "./pages/Offers";
import CreateListing from "./pages/CreateListing";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Explore />}></Route>
          <Route path="/offers" element={<Offers />}></Route>
          <Route path="/category/:categoryName" element={<Category />}></Route>
          {/* Using nested routing: refer to PrivateRoute.jsx */}
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />}></Route>
          </Route>
          <Route path="/sign-in" element={<SignIn />}></Route>
          <Route path="/sign-up" element={<SignUp />}></Route>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          <Route path="/create-listing" element={<CreateListing />}></Route>
        </Routes>
        <Navbar></Navbar>
      </BrowserRouter>
      <ToastContainer></ToastContainer>
    </>
  );
}

export default App;
