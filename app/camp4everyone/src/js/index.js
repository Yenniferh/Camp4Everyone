import React, {useState, useEffect} from "react";
import Public from "./public/index";
import Private from './private/index.js';
import {Provider, Consumer} from '../AuthContext';
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import theme from "./theme";
import { signout } from './services/firebase';

function Main() {
  /* const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    const uid = sessionStorage.getItem("user");
    uid !== null && setIsAuth(true);
  },[isAuth]);

  const setAuthentication = val => { 
    if(!val){
      signout();
      sessionStorage.clear();
    }  
    setIsAuth(val);
  } */

  return (
    <main>
      <MuiThemeProvider theme={theme}>
        <Provider>
          <Consumer>
            {({ isAuth }) => (isAuth ? <Private /> : <Public />)}
          </Consumer>
        </Provider>
      </MuiThemeProvider>
    </main>
  )
}

export default Main
