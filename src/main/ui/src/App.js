import React, { useState } from 'react';
import { Route, Switch, useHistory } from "react-router-dom";
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

import Main from "./Views/Main";
import Settings from "./Views/Settings";

const initSettings = {
  cpuColor: [0,255,0],
  gpuColor: [255,0,0]
}

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const history = useHistory();

  const [settings, setSettings] = useState(initSettings);

  const submitSetting = (newSettings) => {
    console.log(newSettings);
    setSettings(newSettings);
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <Switch>
        <Route exact path="/">
          <Main settings={settings} history={history}/>
        </Route>
        <Route exact path="/settings">
          <Settings settings={settings} submitFunc={submitSetting} history={history}/>
        </Route>
      </Switch>
    </ThemeProvider>
  );
}

export default App;
