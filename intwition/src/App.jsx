import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import './App.css';
import Home from './home/home';

function App() {
  return (
    <ThemeProvider>
      <div className="app-container">
        <header className="app-header">
          <Home />
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;