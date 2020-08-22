import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import './App.css';
import Home from './Home/Home';
import NavBar from './NavBar/NavBar';
import { Box } from '@material-ui/core';

function App() {
  return (
    <ThemeProvider>
      <NavBar></NavBar>
      <Box className="app-container">
        <Home />
      </Box>
    </ThemeProvider>
  );
}

export default App;