/* eslint-disable import/prefer-default-export */
import api from '../../services/Api';
import { ORDER_ERROR, GET_ORDER, DELETE_ORDER } from '../types';

// Get order
export const getUsersOrder = async (id) => {
  try {
    const res = await api.get(`users/me/orders/${id}`);
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

// Delete order
export const deleteUsersOrder = async (id, dispatch) => {
  try {
    await api.delete(`users/me/orders/${id}`);
    const user = api.get(`users/me/`);
    return user;
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
