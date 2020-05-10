import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { Router, navigate } from '@reach/router';
import { ReactQueryDevtools } from 'react-query-devtools';
// JWT / Axios
import axios from 'axios';
import jwtDecode from 'jwt-decode';
// Redux
import store from '../redux/store';
import { logoutUser } from '../redux/actions/user.actions';
import { fetchAllData } from '../redux/actions/data.actions';
// Component
import ErrorCatcher from '../common/utils/ErrorCatcher';
// Styling
import theme from '../common/utils/theme';
import './App.css';
// Pages
import AlertContainer from '../common/ui/AlertContainer';
import AuthPage from './auth/AuthPage';
import Bookmarks from './bookmarks/Bookmarks';
import Home from './home/Home';
import Layout from '../common/ui/Layout';
import Notifications from './notifications/Notifications';
import Profile from './profile/Profile';
import Discover from './discover/Discover';

axios.defaults.baseURL = 'http://localhost:6500';
const token = localStorage.token;
if (token) {
  const decoded = jwtDecode(token);
  if (decoded.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    navigate('/');
  } else {
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(fetchAllData());
    const path =
      window.location.pathname === '/' ? '/home' : window.location.pathname;
    navigate(path);
  }
} else {
  navigate('/');
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <ErrorCatcher>
        <AlertContainer />
        <Router>
          <AuthPage path="/" />
        </Router>
        <Router component={Layout}>
          <Home path="home" />
          <Discover path="discover/*" />
          <Notifications path="notifications" />
          <Bookmarks path="bookmarks" />
          <Profile path=":userId/*" />
        </Router>
      </ErrorCatcher>
      <ReactQueryDevtools initialIsOpen={false} />
    </ThemeProvider>
  );
}
