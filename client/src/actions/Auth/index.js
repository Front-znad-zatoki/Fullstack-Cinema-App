// import useUsersDispatcher from '../../hooks/useUsersDispatch';
import api from '../../services/Api';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from '../types';

// Register User
export const register = async (formData, dispatch) => {
  console.log('registering');
  try {
    const res = await api.post('/users/signup', formData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    console.log('registered');
  } catch (err) {
    const { errors } = err.response.data;
    if (errors) {
      errors.forEach((error) => alert(error.msg, 'Something went wrong'));
    }
    console.log('not registered');
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Logout
export const logout = () => ({ type: LOGOUT });

// check if authenticated after page init
export const checkIfIsAuthenticated = () => {
  try {
    // const res = await api.get('/users/authenticated');
    console.log('checking if cookie exists');
  } catch {
    console.log('no cookies');
  }
};
