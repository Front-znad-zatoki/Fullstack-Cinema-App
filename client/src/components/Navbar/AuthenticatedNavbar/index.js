import { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ReservationContext } from '../../../context/Reservation';
import { RESET_RESERVATION } from '../../../actions/types';

const AuthenticatedNavBar = ({ user, callback }) => {
  const history = useHistory();
  const { reservation, dispatchReservation } = useContext(ReservationContext);
  const handleClick = (event) => {
    dispatchReservation({ type: RESET_RESERVATION });
  };
  return (
    <>
      <Link to="/users/me" onClick={handleClick}>
        <li className="navbar__list-item">Me</li>
      </Link>
      {user && user.isAdmin ? (
        <Link to="/admin" onClick={handleClick}>
          <li className="navbar__list-item">Admin</li>
        </Link>
      ) : null}
      <button type="button" className="navbar__list-item" onClick={callback}>
        Logout
      </button>
    </>
  );
};

export default AuthenticatedNavBar;
