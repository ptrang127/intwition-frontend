import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import './App.css';
import Home from './Home/Home';
import About from './About/About';
import NavBar from './NavBar/NavBar';
import { Box, createMuiTheme } from '@material-ui/core';
import {
  Switch,
  Route,
} from "react-router-dom";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#4665EC"
    },
  },
  typography: {
    fontFamily: "Segoe UI, Roboto",
    h2: {
      fontSize: "3.5rem"
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavBar></NavBar>
      <Box className="app-container">
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Box>
    </ThemeProvider>
  );
}

export default App;