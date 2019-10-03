import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './Landing/';

function Public() {
  return (
    <main>
      <BrowserRouter>
        <Route path="/" exact component={Landing} />
      </BrowserRouter>
    </main>
  );
}

export default Public;
