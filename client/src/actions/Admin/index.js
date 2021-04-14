/* eslint-disable import/prefer-default-export */
import api from '../../services/Api';
import { CHANGE_SUCCESS } from '../types';
import handleAxiosError from '../../services/Errors/handleAxiosError';
// Change name
export const getCollection = async (collectionName, dispatch, setLoading) => {
  try {
    const res = await api.get(`${collectionName}`);
    dispatch(res.data);
    setLoading(false);
    return res;
  } catch (error) {
    handleAxiosError(error);
  }
};
