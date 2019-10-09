import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Navbar from "../public/Navbar/";
import Footer from "../public/Footer/";

function Private(props) {
  return (
    <main>
      <BrowserRouter>
        <Navbar setAuthentication={props.setAuthentication}  ></Navbar>
      </BrowserRouter>
    </main>
  );
}
export default Private;