/* eslint-disable import/prefer-default-export */
import api from '../../services/Api';
import handleAxiosError from '../../services/Errors/handleAxiosError';

// Get collection
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

// Delete collection item
export const deleteCollectionItem = async (
  collectionName,
  id,
  dispatch,
  setLoading,
) => {
  try {
    const deleted = await api.delete(`${collectionName}/${id}`);
    const res = await api.get(`${collectionName}`);
    dispatch(res.data);
    setLoading(false);
    return res;
  } catch (error) {
    handleAxiosError(error);
  }
};
