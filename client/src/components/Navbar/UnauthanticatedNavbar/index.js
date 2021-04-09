import { Link } from 'react-router-dom';

const UnauthenticatedNavBar = () => {
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

export default UnauthenticatedNavBar;
