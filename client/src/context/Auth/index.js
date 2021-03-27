import { createContext, useEffect, useReducer, useState } from 'react';
import authReducer from './authReducer';

export const AuthContext = createContext();

const initialState = {
  isAuthenticated: null,
  loading: true,
  user: null,
};

const AuthContextProvider = ({ children }) => {
  // const [user, setUser] = useState(null);
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [isLoaded, setIsLoaded] = useState(false);
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
