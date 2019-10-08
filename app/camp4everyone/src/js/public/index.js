import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Landing from "./Landing/";
import Category from "./Category/";
import AboutUs from "./AboutUs/";
import Login from "./Login/";
import Signup from "./Signup/";
import Navbar from "./Navbar";
import PasswordRec from "./PasswordRecovery";
import CategoryNav from "./CategoryNavigation";

function Public() {
  return (
    <main>
      <Navbar />
      <BrowserRouter>
        <Route path="/" exact component={Landing} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/category" component={Category} />
        <Route path="/aboutus" component={AboutUs} />
        <Route path="/passwordrecovery" component={PasswordRec} />
        <Route path="/categorynav" component={CategoryNav} />
      </BrowserRouter>
    </main>
  );
}
export default Public;