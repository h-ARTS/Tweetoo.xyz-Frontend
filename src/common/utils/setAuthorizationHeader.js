import axios from 'axios';

export default function setAuthorizationHeader(token) {
  const bToken = `Bearer ${token}`;
  localStorage.setItem('token', bToken);
  axios.defaults.headers.common['Authorization'] = bToken;
}
