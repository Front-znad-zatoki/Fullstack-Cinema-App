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
  LOGOUT_FAIL,
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
    console.log('registered', res);
    return true;
  } catch (err) {
    const { errors } = err.response.data;
    if (errors) {
      errors.forEach((error) => alert(error.msg, 'Something went wrong'));
    }
    console.log('not registered', errors);
    dispatch({
      type: REGISTER_FAIL,
    });
    return false;
  }
};

// Logout
export const logout = async (dispatch) => {
  try {
    await api.post('/users/logout');
    dispatch({
      type: LOGOUT,
    });
  } catch (err) {
    const { errors } = err.response.data;

    if (errors) {
      errors.forEach((error) => dispatch(alert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGOUT_FAIL,
    });
  }
};

// check if authenticated after page init
export const checkIfIsAuthenticated = () => {
  try {
    // TODO: get cookies
    console.log('checking if cookie exists');
  } catch {
    console.log('no cookies');
  }
};

// Login User
export const login = async (formData, dispatch) => {
  const { email, password } = formData;
  const body = { email, password };

  try {
    const res = await api.post('/users/login', body);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const { errors } = err.response.data;

    if (errors) {
      errors.forEach((error) => dispatch(alert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Load User
export const loadUser = async (dispatch) => {
  try {
    const res = await api.get('/users/me');

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
