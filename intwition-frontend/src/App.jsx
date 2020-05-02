import React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './App.css';
import Sentiment from './components/sentiment/sentiment';
import 'typeface-roboto';
import { blue } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#475D93' 
    }
  }
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <Sentiment/>
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
