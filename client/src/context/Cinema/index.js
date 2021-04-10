import { createContext, useState } from 'react';
import cinemasMock from '../../mock/cinemaMock';

export const CinemaContext = createContext();

const CinemaContextProvider = ({ children }) => {
  const [cinemas, setCinemas] = useState(cinemasMock);
  const [currentCinema, setCurrentCinema] = useState(cinemas[0]);

  return (
    <CinemaContext.Provider
      value={{ currentCinema, setCurrentCinema, cinemas, setCinemas }}
    >
      {children}
    </CinemaContext.Provider>
  );
};

export default CinemaContextProvider;
