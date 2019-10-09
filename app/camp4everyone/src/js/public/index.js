import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Landing from "./Landing/";
import Category from "./Category/";
import AboutUs from "./AboutUs/";
import Login from './Login/'
import Signup from './Signup/'
import PasswordRec from "./PasswordRecovery";
import CategoryNav from "./CategoryNavigation";
import Navbar from "./Navbar/";
import Footer from "./Footer/";
import TermsAndConditions from './TermsAndConditions/'

function Public(props) {
  return (
    <main>
      <BrowserRouter>
        <Navbar></Navbar>
        <Route path="/" exact component={Landing} />
        <Route path="/signup" render={()=><Signup setAuthentication={props.setAuthentication} />} />
        <Route path="/login" render={()=><Login setAuthentication={props.setAuthentication} />} />
        <Route path="/category" component={Category} />
        <Route path="/aboutus" component={AboutUs} />
        <Route path="/termsandconditions" component={TermsAndConditions} />
        <Route path="/passwordrecovery" component={PasswordRec} />
        <Route path="/categorynav" component={CategoryNav} />
        <Footer></Footer>

      </BrowserRouter>
    </main>
  );
}
export default Public;