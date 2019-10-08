import React from "react";
import Public from "./public/index";
//import Private from './private/index.js';

import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import theme from "./theme";

function Main() {
  return (
    <main>
      <MuiThemeProvider theme={theme}>
        {
          // isAuth ?
          //   <Private setAuthentication={setAuthentication} />
          // :
          <Public />
        }
      </MuiThemeProvider>
    </main>
  );
}

export default Main;
