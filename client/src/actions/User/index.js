/* eslint-disable import/prefer-default-export */
import api from '../../services/Api';
import {
  CHANGE_EMAIL,
  CHANGE_PHONE,
  CHANGE_NAME,
  CHANGE_SURNAME,
} from '../types';

// Change name
export const changeUsersName = async (id) => {
  try {
    const res = await api.get(`users/me/${id}`);
    return res;
    // TODO: define if there is a need for reducer
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
    console.log(error.config);
    return false;
  }
};
