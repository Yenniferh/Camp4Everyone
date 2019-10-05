import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Landing from "./Landing/";
import Category from "./Category/";
import AboutUs from "./AboutUs/";

function Public() {
  return (
    <main>
      <BrowserRouter>
        <Route path="/" exact component={Landing} />
        <Route path="/category" component={Category} />
        <Route path="/aboutus" component={AboutUs} />
      </BrowserRouter>
    </main>
  );
}

export default Public;
