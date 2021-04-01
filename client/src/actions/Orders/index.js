/* eslint-disable import/prefer-default-export */
import api from '../../services/Api';
import { ORDER_ERROR, ADD_ORDER, GET_ORDER, DELETE_ORDER } from '../types';

// Get order
export const getUsersOrder = async (id) => {
  try {
    const res = await api.get(`users/me/orders/${id}`);
    return res;

    // TODO: define if there is a need for reducer
    // dispatch({
    //   type: GET_ORDER,
    //   payload: res.data,
    // });
  } catch (err) {
    // dispatch({
    //   type: ORDER_ERROR,
    //   payload: { msg: err.response.statusText, status: err.response.status },
    // });
    alert(err);
  }
};
