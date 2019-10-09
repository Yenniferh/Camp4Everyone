import React from "react";
import AppBar from '@material-ui/core/AppBar'
import MaterialIcon from 'material-icons-react'
import { Toolbar } from '@material-ui/core'
import { Link } from 'react-router-dom'


function Footer() {
  return (
    <AppBar position='static' color='primary/light'>
        <Toolbar>
            <Link to='/aboutus'>
                About Us
            </Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to='/termsandconditions'>
                Terms and Conditions
            </Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to='/category'>
                Categories
            </Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to='/categorynav'>
                Category View Example
            </Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to='/passwordrecovery'>
                Password Recovery
            </Link>
        </Toolbar>
    </AppBar>
  );
}
export default Footer;