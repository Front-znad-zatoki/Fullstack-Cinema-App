import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { Link } from 'react-router-dom';

function Navbar({ name, icon }) {
  return (
    <div className="navbar">
      <h1>
        <span className={icon} /> {name}
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
      </ul>
    </div>
  );
}

Navbar.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  name: 'FZZ Cinemas',
  icon: 'fas fa-video',
};

export default Navbar;
