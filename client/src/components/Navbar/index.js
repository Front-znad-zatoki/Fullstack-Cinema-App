import { useContext, useState } from 'react';
import './style.scss';
import { Link, Redirect } from 'react-router-dom';
import { logout } from '../../actions/Auth';
import { AuthContext } from '../../context/Auth';
import { ThemeContext } from '../../context/Theme';
import AppTheme from '../../context/Theme/themeColors';
import ThemeToggler from '../ThemeToggler';
import UnauthenticatedNavBar from './UnauthanticatedNavbar';
import AuthenticatedNavBar from './AuthenticatedNavbar';

function Navbar() {
  const { userContext, dispatchUserContext } = useContext(AuthContext);
  const { isAuthenticated, user } = userContext;
  const theme = useContext(ThemeContext)[0];
  const currentTheme = AppTheme[theme];

  const onClickLogoutHandler = async () => {
    const isLoggedOut = await logout(dispatchUserContext);
    if (!isLoggedOut) {
      alert('Could not log out user. Try again');
    }
    return <Redirect to="/" />;
  };

  return (
    <nav
      className="navbar"
      style={{
        backgroundColor: `${currentTheme.backgroundColor}`,
        color: `${currentTheme.textColor}`,
      }}
    >
      <Link to="/">
        <span className="fas fa-video" />
        <h1>FZZ Cinemas</h1>
      </Link>
      <div className="">
        <ul className="navbar__list">
          <Link to="/movies">
            <li className="navbar__list-item">Movies</li>
          </Link>
          {!isAuthenticated ? (
            <UnauthenticatedNavBar callback={onClickLogoutHandler} />
          ) : (
            <AuthenticatedNavBar callback={onClickLogoutHandler} user={user} />
          )}
        </ul>
        <ThemeToggler />
      </div>
    </nav>
  );
}

export default Navbar;
