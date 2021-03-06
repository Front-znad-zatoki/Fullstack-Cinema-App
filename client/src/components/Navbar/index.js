import React from 'react';
import './style.scss';
import { Link } from 'react-router-dom';
import {
  ROUTE_ROOT,
  ROUTE_MOVIES,
  ROUTE_SIGNUP,
  ROUTE_LOGIN,
} from '../../routes';

function Navbar() {
  return (
    <nav className="navbar">
      <h1>
        <span className="fas fa-video" /> 'FZZ Cinemas'
      </h1>
      <ul>
        <li>
          <Link to={ROUTE_ROOT}>Home</Link>
        </li>
        <li>
          <Link to={ROUTE_MOVIES}>Movies</Link>
        </li>
        <li>
          <Link to={ROUTE_SIGNUP}>SignUp</Link>
        </li>
        <li>
          <Link to={ROUTE_LOGIN}>Login</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
