import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ReservationContext } from '../../../context/Reservation';
import { RESET_RESERVATION } from '../../../actions/types';

const UnauthenticatedNavBar = () => {
  const { dispatchReservation } = useContext(ReservationContext);
  const handleClick = (event) => {
    dispatchReservation({ type: RESET_RESERVATION });
  };
  return (
    <>
      <Link to="/login" onClick={handleClick}>
        <li className="navbar__list-item">Login</li>
      </Link>
      <Link to="/signup" onClick={handleClick}>
        <li className="navbar__list-item">Sign up</li>
      </Link>
    </>
  );
};

export default UnauthenticatedNavBar;
