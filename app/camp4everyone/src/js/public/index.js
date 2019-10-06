import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Landing from "./Landing/";
import Category from "./Category/";
import AboutUs from "./AboutUs/";
import Login from './Login/'
import Signup from './Signup/'

function Public() {
  return (
    <main>
      <BrowserRouter>
        <Route path='/' exact component={Landing} />
        <Route path='/signup' component={Signup} />
        <Route path='/login' component={Login} />
        <Route path="/" exact component={Landing} />
        <Route path="/category" component={Category} />
        <Route path="/aboutus" component={AboutUs} />
      </BrowserRouter>
    </main>
  )
}

export default Public
