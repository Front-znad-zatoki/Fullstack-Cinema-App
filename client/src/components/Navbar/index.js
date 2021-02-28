import './style.scss';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="navbar">
      Rendering Navbar in here
      <h1>Navigation</h1>
      <ul>
        <li><Link to="/movies">Movies</Link></li>
        <li><Link to="/signup">SignUp</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </div>
  );
}

export default Navbar;
