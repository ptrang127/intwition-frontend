import React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './App.css';
import Sentiment from './sentiment/sentiment';
import 'typeface-roboto';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#F5F5F5'
    }
  }
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <Sentiment />
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;