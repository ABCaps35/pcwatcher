import React from 'react';
import { Route, Switch } from "react-router-dom";
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

import Main from "./Views/Main";

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
      </Switch>
    </ThemeProvider>
  );
}

export default App;
