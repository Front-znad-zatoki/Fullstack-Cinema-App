import { useContext } from 'react';
import { AuthContext } from '../../context/Auth';

const useUsersDispatcher = (data) => {
  const { dispatchUserContext } = useContext(AuthContext);
  return dispatchUserContext(data);
};

export default useUsersDispatcher;
