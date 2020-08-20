import React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './App.css';
import Sentiment from './sentiment/sentiment';
import 'typeface-roboto';

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <header className="App-header">
          <Sentiment />
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;