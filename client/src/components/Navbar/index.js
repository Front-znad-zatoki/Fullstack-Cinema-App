import { useContext, useState } from 'react';
import './style.scss';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/Auth';
import { AuthContext } from '../../context/Auth';
import { ThemeContext } from '../../context/Theme';
import AppTheme from '../../context/Theme/themeColors';
import ThemeToggler from '../ThemeToggler';

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
  };
  // console.log(isAuthenticated);
  const unauthenticatedNavBar = () => {
    return (
      <>
        <Link to="/login">
          <li className="navbar__list-item">Login</li>
        </Link>
        <Link to="/signup">
          <li className="navbar__list-item">Sign up</li>
        </Link>
      </>
    );
  };

  const authenticatedNavBar = () => {
    return (
      <>
        <Link to="/users/me">
          <li className="navbar__list-item">Me</li>
        </Link>
        <Link to="/users/orders">
          <li className="navbar__list-item">Orders</li>
        </Link>
        {user.isAdmin ? (
          <Link to="/admin">
            <li className="navbar__list-item">Admin</li>
          </Link>
        ) : null}
        <button
          type="button"
          className="navbar__list-item"
          onClick={onClickLogoutHandler}
        >
          Logout
        </button>
      </>
    );
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
          {!isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}
        </ul>
        <ThemeToggler />
      </div>
    </nav>
  );
  // return (
  //   <nav className="navbar">
  //     <h1>
  //       <span className="fas fa-video" /> 'FZZ Cinemas'
  //     </h1>
  //     <ul>
  //       <li>
  //         <Link to="/">Home</Link>
  //       </li>
  //       <li>
  //         <Link to="/movies">Movies</Link>
  //       </li>
  //       <li>
  //         <Link to="/signup">SignUp</Link>
  //       </li>
  //       <li>
  //         <Link to="/login">Login</Link>
  //       </li>
  //       <li>
  //         <ThemeToggler />
  //       </li>
  //     </ul>
  //   </nav>
  // );
}

export default Navbar;
