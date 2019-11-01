import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Admin from "./admin";
import Home from "./Home";
import Profile from "./Profile";
import Navbar from "../public/Navbar";
import Landing from "../public/Landing";

function Private(props) {
  return (
    <main>
      <BrowserRouter>
        <Navbar></Navbar>
        <Route
          path="/admin"
          render={() => (
            <Admin setAuthentication={props.setAuthentication}></Admin>
          )}
        />
        <Route
          path="/home"
          render={() => (
            <Home setAuthentication={props.setAuthentication}></Home>
          )}
        />
        <Route
          path="/profile"
          render={() => (
            <Profile setAuthentication={props.setAuthentication}></Profile>
          )}
        />
      </BrowserRouter>
    </main>
  );
}
export default Private;
