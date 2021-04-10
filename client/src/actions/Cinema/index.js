import api from '../../services/Api';

// Get all cinemas
const getMovies = async (dispatch) => {
  try {
    const res = await api.get(`cinemas`);
    dispatch(res.data);
    return res;
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

export default getMovies;
