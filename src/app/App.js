import React, { Component } from 'react';
import { MuiThemeProvider as ThemeProvider } from '@material-ui/core/styles';
import { Router, navigate } from '@reach/router';
// JWT / Axios
import axios from 'axios';
import jwtDecode from 'jwt-decode';
// Redux
import store from '../redux/store';
import { SET_AUTHENTICATED } from '../redux/types';
import { logoutUser } from '../redux/actions/user.actions';
import { fetchAllData } from '../redux/actions/ui.actions';
// Component
import ErrorCatcher from '../common/utils/ErrorCatcher';
// Styling
import theme from '../common/utils/theme';
import './App.css';
// Pages
import AuthPage from './auth/AuthPage';
import Home from './home/Home';
import Profile from './profile/Profile';
import Trending from './trending/Trending';
import Layout from '../common/ui/Layout';

axios.defaults.baseURL = 'http://localhost:6500';
const token = localStorage.token;

if (token) {
  const decoded = jwtDecode(token);
  if (decoded.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    navigate('/');
  } else {
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch({ type: SET_AUTHENTICATED });
    store.dispatch(fetchAllData());
    navigate('/home');
  }
} else {
  navigate('/');
}

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <ErrorCatcher>
          <Router>
            <AuthPage path="/" />
          </Router>
          <Router component={Layout}>
            <Home path="home" />
            <Trending path="trending" />
            <Profile path=":userId/*" />
          </Router>
        </ErrorCatcher>
      </ThemeProvider>
    );
  }
}

export default App;
