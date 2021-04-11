import './style.scss';
import React, { useState, useContext, useEffect } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { ThemeContext } from '../../../context/Theme';
import AppTheme from '../../../context/Theme/themeColors';
import { AuthContext } from '../../../context/Auth';
import Message from '../../../components/Message';
import { login } from '../../../actions/Auth';

function Login(props) {
  const { userContext, dispatchUserContext } = useContext(AuthContext);
  const { isAuthenticated } = userContext;
  const [alertMsg, setAlertMsg] = useState(null);
  const theme = useContext(ThemeContext)[0];
  const currentTheme = AppTheme[theme];
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const history = useHistory();
  const { email, password } = formData;

  const onChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const isLoggedIn = await login({ email, password }, dispatchUserContext);
    history.push('/');

    if (!isLoggedIn) {
      setAlertMsg('Could not login user. Try again');
    }
  };

  return !isAuthenticated ? (
    <div
      className="auth"
      style={{
        backgroundColor: `${currentTheme.backgroundColor}`,
        color: `${currentTheme.textColor}`,
      }}
    >
      <h2>Login</h2>
      {alertMsg ? <Message message={alertMsg} /> : null}
      <form className="auth__form" onSubmit={onSubmit}>
        <label htmlFor="loginEmail" className="auth__form-group">
          <input
            type="email"
            id="loginEmail"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </label>
        <label htmlFor="loginPassword" className="auth__formgroup">
          <input
            id="loginPassword"
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            minLength="5"
          />
        </label>
        <button type="submit" className="button--submit">
          Login
        </button>
      </form>
      <p className="auth__redirect">
        Do not have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  ) : (
    <Redirect to="/" />
  );
}

export default Login;
