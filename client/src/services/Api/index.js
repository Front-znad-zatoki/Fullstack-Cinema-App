import axios from 'axios';
import { LOGOUT } from '../../actions/types';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      console.log({ type: LOGOUT });
    }
    return Promise.reject(err);
  },
);

export default api;
