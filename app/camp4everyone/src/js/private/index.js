import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Admin from './Admin';
import Home from './Home';

function Private(props) {
  return (
    <main>
      <BrowserRouter>
        <Route path="/admin" render={()=><Admin setAuthentication={props.setAuthentication}></Admin>} />
        <Route path="/home" render={()=><Home setAuthentication={props.setAuthentication}></Home>} />
      </BrowserRouter>
    </main>
  );
}
export default Private;
