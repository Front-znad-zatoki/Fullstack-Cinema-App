import React from 'react';
import './style.scss';
import { Link } from 'react-router-dom';
import ThemeToggler from '../ThemeToggler';

function Navbar() {
  return (
    <nav className="navbar">
      <h1>
        <span className="fas fa-video" /> 'FZZ Cinemas'
      </h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/movies">Movies</Link>
        </li>
        <li>
          <Link to="/signup">SignUp</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <ThemeToggler />
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
