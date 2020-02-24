import React, { Component } from 'react';
import { Router } from '@reach/router';
// Styling
import './App.css';
import theme from './utils/theme';
import { MuiThemeProvider as ThemeProvider } from '@material-ui/core/styles';
// Pages
import { AuthPage } from './components/pages/AuthPage';
import Home from './components/pages/Home';
// Component
import ErrorCatcher from './ErrorCatcher';
// JWT / Axios
import jwtDecode from 'jwt-decode';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000/api';

const token = localStorage.token;
if (token) {
  const decoded = jwtDecode(token);
  if (decoded.exp * 1000 < Date.now()) {
    window.location.href = '/';
  } else {
    axios.defaults.headers['Authorization'] = token;
  }
}

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <ErrorCatcher>
          <Router>
            <AuthPage path="/" />
            <Home path="/home" />
            <Home path="/trending" />
          </Router>
        </ErrorCatcher>
      </ThemeProvider>
    );
  }
}

export default App;
