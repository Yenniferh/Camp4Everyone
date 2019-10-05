import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './Landing/';
import Login from './Login/';

function Public() {
  return (
    <main>
      <BrowserRouter>
        <Route path="/" exact component={Landing} />
        <Route path="/login" component={Login} />
      </BrowserRouter>
    </main>
  );
}

export default Public;
