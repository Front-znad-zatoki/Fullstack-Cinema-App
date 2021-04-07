/* eslint-disable import/prefer-default-export */
import api from '../../services/Api';
import { CHANGE_SUCCESS, CHANGE_FAIL } from '../types';

// Change name
export const changeUsersData = async (title, formData, dispatch) => {
  try {
    console.log(formData);
    const res = await api.put(`users/me/${title}`, formData);
    console.log(res);
    dispatch({
      type: CHANGE_SUCCESS,
      payload: res.data,
    });
    return res;
    // TODO: define if there is a need for reducer
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      const { errors } = error.response.data;
      if (errors) {
        alert(errors[0].msg, 'Something went wrong');
      }
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
    console.log(error.config);
    return false;
  }
};
