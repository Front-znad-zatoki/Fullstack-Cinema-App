import { useContext, useEffect, useState } from 'react';
import './style.scss';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { logout } from '../../actions/Auth';
import { AuthContext } from '../../context/Auth';
import { ThemeContext } from '../../context/Theme';
import AppTheme from '../../context/Theme/themeColors';
import ThemeToggler from '../ThemeToggler';
import UnauthenticatedNavBar from './UnauthanticatedNavbar';
import AuthenticatedNavBar from './AuthenticatedNavbar';
import CinemaForm from './CinemaForm';
import { CinemaContext } from '../../context/Cinema';
import { ReservationContext } from '../../context/Reservation';
import { RESET_RESERVATION } from '../../actions/types';

function Navbar() {
  const history = useHistory();
  const { reservation, dispatchReservation } = useContext(ReservationContext);
  const { userContext, dispatchUserContext } = useContext(AuthContext);
  const { isAuthenticated, user } = userContext;
  const theme = useContext(ThemeContext)[0];
  const currentTheme = AppTheme[theme];
  const { cinemas, currentCinema, setCurrentCinema } = useContext(
    CinemaContext,
  );
  const onClickLogoutHandler = async () => {
    const isLoggedOut = await logout(dispatchUserContext);
    dispatchReservation({ type: RESET_RESERVATION });
    if (!isLoggedOut) {
      alert('Could not log out user. Try again');
    }
    return <Redirect to="/" />;
  };
  const handleLogoClick = (event) => {
    event.preventDefault();
    dispatchReservation({ type: RESET_RESERVATION });
    history.push(`/`);
  };
  return (
    <nav
      className="navbar"
      style={{
        backgroundColor: `${currentTheme.backgroundColor}`,
        color: `${currentTheme.textColor}`,
      }}
    >
      <button onClick={handleLogoClick} className="navbar__logo">
        <span className="fas fa-video" />
        <h1>FZZ Cinemas </h1>
        <h3>{currentCinema.city}</h3>
      </button>
      {/* <CinemaForm /> */}

      <ul className="navbar__list">
        <Link to="/movies">
          <li className="navbar__list-item">Movies</li>
        </Link>
        {!isAuthenticated ? (
          <UnauthenticatedNavBar callback={onClickLogoutHandler} />
        ) : (
          <AuthenticatedNavBar callback={onClickLogoutHandler} user={user} />
        )}
        <ThemeToggler />
      </ul>
    </nav>
  );
}

export default Navbar;
