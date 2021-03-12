import './style.scss';
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../../context/Theme';
import AppTheme from '../../../context/Theme/themeColors';

function Login() {
  const theme = useContext(ThemeContext)[0];
  const currentTheme = AppTheme[theme];
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    console.log(email, password);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(email, password);
  };

  // TODO: add context to retrieve info if the user is already authenticated
  // if (isAuthenticated) {
  //   return <Redirect to="/user/me" />;
  // }

  return (
    <div
      className="auth"
      style={{
        backgroundColor: `${currentTheme.backgroundColor}`,
        color: `${currentTheme.textColor}`,
      }}
    >
      <h1>Login</h1>
      <form className="auth__form" onSubmit={onSubmit}>
        <div className="auth__form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="auth__formgroup">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            minLength="5"
          />
        </div>
        {/* TODO: add submit logic */}
        <button type="submit" className="button--submit">
          Login
        </button>
      </form>
      <p className="auth__redirect">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}

export default Login;
