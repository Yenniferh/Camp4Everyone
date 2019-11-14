import React, {useState, useEffect} from "react";
import Public from "./public/index";
import Private from './private/index.js';
import {Provider, Consumer} from '../AuthContext';
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import theme from "./theme";

function Main() {
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
