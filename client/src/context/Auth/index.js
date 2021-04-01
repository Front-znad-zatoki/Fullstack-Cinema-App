import { createContext, useReducer } from 'react';
import authReducer from './authReducer';

export const AuthContext = createContext();

const initialState = {
  isAuthenticated: null,
  loading: true,
  user: {
    id: undefined,
    isAdmin: undefined,
  },
};

const AuthContextProvider = ({ children }) => {
  const [userContext, dispatchUserContext] = useReducer(
    authReducer,
    initialState,
  );

  return (
    <AuthContext.Provider value={{ userContext, dispatchUserContext }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
