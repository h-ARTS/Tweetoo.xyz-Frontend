import React, { Component } from 'react';
import './App.css';
import theme from './utils/theme';
import { Link, Router } from '@reach/router';
import { MuiThemeProvider as ThemeProvider } from '@material-ui/core/styles';
import { AuthPage } from './components/pages/AuthPage';

import ErrorCatcher from './ErrorCatcher';

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
        <nav>
          <Link to="/home">Home</Link>
          <Link to="dashboard">Dashboard</Link>
        </nav>
        <ErrorCatcher>
          <Router>
            <AuthPage path="/" />
            <div path="/dashboard"></div>
          </Router>
        </ErrorCatcher>
      </ThemeProvider>
    );
  }
}

export default App;
