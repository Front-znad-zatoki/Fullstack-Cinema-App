import { createContext, useEffect, useState } from 'react';
import { SUCCESS, FAIL } from '../../actions/types';
import { checkIfIsAuthenticated } from '../../actions/Auth/index';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div>
      <AuthContext.Provider
        value={{ user, setUser, isAuthenticated, setIsAuthenticated }}
      >
        {children}
      </AuthContext.Provider>
    </div>
  );
};

export default AuthContextProvider;
