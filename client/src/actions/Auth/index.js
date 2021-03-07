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
export const register = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/users', formData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    console.log('registered');
  } catch (err) {
    const { errors } = err.response.data;

    if (errors) {
      errors.forEach((error) => console.log(error.msg, 'danger'));
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Logout
export const logout = () => ({ type: LOGOUT });
