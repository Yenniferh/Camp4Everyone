import React from 'react';
import Navbar from '../public/Navbar/';
import { BrowserRouter, Route } from 'react-router-dom';
import Admin from './admin/';

function Private(props) {
  return (
    <main>
      <BrowserRouter>
        <Route path="/admin" render={()=><Admin setAuthentication={props.setAuthentication}></Admin>} />
      </BrowserRouter>
    </main>
  );
}
export default Private;
