import { Link } from 'react-router-dom';

const AuthenticatedNavBar = ({ user, callback }) => {
  return (
    <>
      <Link to="/users/me">
        <li className="navbar__list-item">Me</li>
      </Link>
      {user && user.isAdmin ? (
        <Link to="/admin">
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
