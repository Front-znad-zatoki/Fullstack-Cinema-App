import { useContext } from 'react';
import './style.scss';
import { Link, useHistory } from 'react-router-dom';
import { logout } from '../../actions/Auth';
import { AuthContext } from '../../context/Auth';
import ThemeToggler from '../ThemeToggler';
import UnauthenticatedNavBar from './UnauthanticatedNavbar';
import AuthenticatedNavBar from './AuthenticatedNavbar';
import { CinemaContext } from '../../context/Cinema';
import { ReservationContext } from '../../context/Reservation';
import { RESET_RESERVATION } from '../../actions/types';
import CookiesDesclaimer from '../CookiesDesclaimer';

function Navbar() {
  const history = useHistory();
  const { dispatchReservation } = useContext(ReservationContext);
  const { userContext, dispatchUserContext } = useContext(AuthContext);
  const { isAuthenticated, user } = userContext;
  const { currentCinema } = useContext(CinemaContext);
  const onClickLogoutHandler = async () => {
    const isLoggedOut = await logout(dispatchUserContext);
    dispatchReservation({ type: RESET_RESERVATION });
    if (!isLoggedOut) {
      alert('Could not log out user. Try again');
      return;
    }
    return history.push('/');
  };
  const handleLogoClick = (event) => {
    event.preventDefault();
    dispatchReservation({ type: RESET_RESERVATION });
    history.push(`/`);
  };
  return (
    <nav className="navbar">
      <Link to="/" onClick={handleLogoClick} className="navbar__logo">
        <span className="fas fa-video" />
        <h1>FZZ Cinemas </h1>
        <h5>{currentCinema.city}</h5>
      </Link>

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
      <CookiesDesclaimer />
    </nav>
  );
}

export default Navbar;
