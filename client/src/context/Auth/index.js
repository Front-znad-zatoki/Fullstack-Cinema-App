import { createContext } from 'react';
import { SUCCESS, FAIL } from '../../actions/types';

export const AuthContext = createContext(['', () => {}]);

function AuthComponent() {
  return <div />;
}

export default AuthComponent;
