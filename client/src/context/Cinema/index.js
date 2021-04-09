import { createContext, useState } from 'react';
import cinemas from '../../mock/cinemaMock';

export const CinemaContext = createContext();

const CinemaContextProvider = ({ children }) => {
  const initialState = cinemas[0];
  const [cinema, setCinema] = useState(initialState);

  return (
    <CinemaContext.Provider value={{ cinema, setCinema }}>
      {children}
    </CinemaContext.Provider>
  );
};

export default CinemaContextProvider;
