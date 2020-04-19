import { LOGIN, LOGOUT, setErrorMessage } from './store';
import axios from 'axios';

export const loginUser = user => ({ type: LOGIN, payload: user });
export const logoutUser = () => ({ type: LOGOUT });

export const loginThunk = (email, password) => dispatch => {
  axios
    .post('/api/auth', { email, password })
    .then(response => {
      const { user } = response.data;
      if (user) {
        dispatch(loginUser(user));
      } else {
        dispatch(setErrorMessage('Bad Credentials'));
      }
    })
    .catch(err => {
      console.error('Error logging in', err);
      dispatch(setErrorMessage('Bad Credentials'));
    });
};

export const logoutThunk = () => dispatch => {
  axios
    .delete('/api/auth/')
    .then(() => {
      dispatch(logoutUser());
    })
    .catch(err => console.error('Error logging out', err));
};

export const checkAuthThunk = () => dispatch => {
  axios
    .get('/api/auth')
    .then(response => {
      const { user } = response.data;
      dispatch(loginUser(user));
    })
    .catch(err => {
      console.error('user not logged in', err);
      dispatch(logoutUser());
    });
};
