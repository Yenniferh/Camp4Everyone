import React from "react";
import Navbar from "../public/Navbar/";
import { BrowserRouter, Route } from "react-router-dom";


function Private(props) {
  return (
    <main>
      <BrowserRouter>
        <Navbar></Navbar>
      </BrowserRouter>
    </main>
  );
}
export default Private;