import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import './App.css';
import Home from './Home/Home';
import About from './About/About';
import NavBar from './NavBar/NavBar';
import { Box } from '@material-ui/core';
import {
  Switch,
  Route,
} from "react-router-dom";
function App() {
  return (
    <ThemeProvider>
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