/* eslint-disable import/prefer-default-export */
import api from '../../services/Api';

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
    return false;
  }
};

// Delete order
export const deleteUsersOrder = async (id, dispatch) => {
  try {
    await api.delete(`users/me/orders/${id}`);
    const user = api.get(`users/me/`);
    return user;
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
    return false;
  }
};
