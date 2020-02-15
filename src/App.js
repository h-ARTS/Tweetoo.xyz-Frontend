import React from 'react';
import './App.css';
import theme from './utils/theme';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Button variant="contained" color="primary">
        Hello World
      </Button>
      <Typography variant="h1"> Hello World </Typography>
    </MuiThemeProvider>
  );
}

export default App;
