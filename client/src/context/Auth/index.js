import { createContext } from 'react';

export const AuthContext = createContext(['', () => {}]);

function AuthComponent() {
  return <div />;
}

export default AuthComponent;
