import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './Landing/';
import Category from './Category/';
import AboutUs from './AboutUs/';
import Login from './Login/';
import Signup from './Signup/';
import PasswordRec from './PasswordRecovery';
import CategoryNav from './CategoryNavigation';
import Navbar from './Navbar/';
import Footer from './Footer/';
import TermsAndConditions from './TermsAndConditions/';
import NotFound from '../public/NotFound';

function Public() {
  return (
    <main>
      <BrowserRouter>
        <Navbar></Navbar>
        <Switch>
          <Route path='/' exact component={Landing} />
          <Route path='/signup' component={Signup} />
          <Route path='/login' component={Login} />
          <Route path='/category' component={Category} />
          <Route path='/aboutus' component={AboutUs} />
          <Route path='/termsandconditions' component={TermsAndConditions} />
          <Route path='/passwordrecovery' component={PasswordRec} />
          <Route path='/categorynav' component={CategoryNav} />
          <Route component={NotFound} />
        </Switch>
        <Footer></Footer>
      </BrowserRouter>
    </main>
  );
}
export default Public;
