/* eslint-disable import/prefer-default-export */
import api from '../../services/Api';
import { CHANGE_SUCCESS } from '../types';
import handleAxiosError from '../../services/Errors/handleAxiosError';
// Change name
export const getCollection = async (collectionName, dispatch) => {
  try {
    const res = await api.get(`${collectionName}`);
    // dispatch({
    //   type: CHANGE_SUCCESS,
    //   payload: res.data,
    // });
    dispatch(res.data);
    console.log('rendering collection', res.data);
    return res;
  } catch (error) {
    handleAxiosError(error);
  }
};
