import React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './App.css';
import Home from './home/home';
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
          <Home />
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;