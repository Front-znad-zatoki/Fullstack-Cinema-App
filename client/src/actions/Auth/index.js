import { CancelToken } from 'axios';
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
  try {
    const source = CancelToken.source();
    const res = await api.post('/users/signup', formData, {
      cancelToken: source.token,
    });

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    source.cancel();
    return true;
  } catch (err) {
    if (err.response) {
      const { errors } = err.response.data;
      if (errors) {
        errors.forEach((error) => alert(error.msg, 'Something went wrong'));
      }
    }
    if (err.request) {
      console.log(err.request);
    } else {
      console.log('Error', err.message);
    }
    dispatch({
      type: REGISTER_FAIL,
    });
    return false;
  }
};

// Logout
export const logout = async (dispatch) => {
  try {
    const source = CancelToken.source();
    await api.get('/users/logout', {
      cancelToken: source.token,
    });
    dispatch({
      type: LOGOUT,
    });
    source.cancel();
    return true;
  } catch (err) {
    if (err.response) {
      const { errors } = err.response.data;

      if (errors) {
        errors.forEach((error) => alert(error.msg, 'danger'));
      }
    }
    if (err.request) {
      console.log(err.request);
    } else {
      console.log('Error', err.message);
    }
    dispatch({
      type: LOGOUT_FAIL,
    });
    return false;
  }
};

// check if authenticated after page init
export const checkIfIsAuthenticated = async (dispatch) => {
  try {
    const source = CancelToken.source();
    const res = await api.get('/users/authenticated', {
      cancelToken: source.token,
    });
    if (res.data.isAuthenticated === true) {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
      source.cancel();
      return true;
    }
    dispatch({
      type: AUTH_ERROR,
    });
    return false;
  } catch (err) {
    if (err.response) {
      console.log(err.response.data);
    } else if (err.request) {
      console.log(err.request);
    } else {
      console.log('Error', err.message);
    }
  }
};

// Login User
export const login = async (formData, dispatch) => {
  const { email, password } = formData;
  const body = { email, password };

  try {
    const source = CancelToken.source();
    const res = await api.post('/users/login', body, {
      cancelToken: source.token,
    });

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    source.cancel();
  } catch (err) {
    if (err.response) {
      const { errors } = err.response.data;

      if (errors) {
        errors.forEach((error) => alert(error.msg, 'danger'));
      }
    } else if (err.request) {
      console.log(err.request);
    } else {
      console.log('Error', err.message);
    }
    dispatch({
      type: LOGIN_FAIL,
      payload: null,
    });
    alert('Login failed');
  }
};

// Load User
export const loadUser = async (dispatch, setLoading) => {
  try {
    const source = CancelToken.source();
    const res = await api.get('/users/me', {
      cancelToken: source.token,
    });

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
    source.cancel();
    setLoading(false);
  } catch (err) {
    if (err.response) {
      console.log(err.response.data);
    } else if (err.request) {
      console.log(err.request);
    } else {
      console.log('Error', err.message);
    }
  }
};
