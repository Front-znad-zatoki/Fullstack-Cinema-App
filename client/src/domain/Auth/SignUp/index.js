import './style.scss';
import React, { useState, useContext, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { ThemeContext } from '../../../context/Theme';
import AppTheme from '../../../context/Theme/themeColors';
import { register } from '../../../actions/Auth';
import { AuthContext } from '../../../context/Auth';
import Message from '../../../components/Message';
import movies from '../../../mock/moviesMock';

function SignUp(props) {
  // TODO: Check cookies
  const { userContext, dispatchUserContext } = useContext(AuthContext);
  const { isAuthenticated } = userContext;
  const theme = useContext(ThemeContext)[0];
  const currentTheme = AppTheme[theme];
  const [alertMsg, setAlertMsg] = useState(null);
  const { poster } = movies[1];

  const initialState = {
    name: '',
    surname: '',
    email: '',
    password: '',
    passwordRepeat: '',
  };
  const [formData, setFormData] = useState(initialState);
  const { name, surname, email, password, passwordRepeat } = formData;
  const onChange = (event) =>
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  const resetForm = () => {
    setFormData(initialState);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (password !== passwordRepeat) {
      alert('Passwords are not the same');
      return;
    }

    const isRegistered = await register(
      { name, surname, email, password },
      dispatchUserContext,
    );
    if (!isRegistered) {
      setAlertMsg('Could not register user. Try again');
      return;
    }
    resetForm();
  };

  return !isAuthenticated ? (
    <div
      className="signup movie__view"
      style={{
        backgroundColor: `${currentTheme.backgroundColor}`,
        color: `${currentTheme.textColor}`,
      }}
    >
      <div className="movie__view__container">
        <img
          className="movie__view__container__image"
          src={poster}
          alt="Movie poster"
        />
      </div>
      <div className="auth__form-container">
        <h2>Sign Up</h2>
        {alertMsg ? <Message message={alertMsg} /> : null}

        <form className="auth__form" onSubmit={onSubmit}>
          <label htmlFor="signupName" className="auth__form-group">
            <input
              className="auth__input"
              id="signupName"
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={onChange}
              required
            />
          </label>
          <label htmlFor="signupSurname" className="auth__form-group">
            <input
              className="auth__input"
              id="signupSurname"
              type="text"
              placeholder="Surname"
              name="surname"
              value={surname}
              onChange={onChange}
              required
            />
          </label>

          <label htmlFor="signupEmail" className="auth__form-group">
            <input
              type="email"
              className="auth__input"
              id="signupEmail"
              className="auth__input"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={onChange}
              required
            />
          </label>
          <label htmlFor="signupPassword" className="auth__form-group">
            <input
              type="password"
              className="auth__input"
              id="signupPassword"
              placeholder="Password"
              name="password"
              value={password}
              onChange={onChange}
              required
            />
          </label>
          <label htmlFor="signupPasswordRepeat" className="auth__form-group">
            <input
              type="password"
              className="auth__input"
              id="signupPasswordRepeat"
              placeholder="Confirm Password"
              name="passwordRepeat"
              value={passwordRepeat}
              onChange={onChange}
              required
            />
          </label>
          <button type="submit" className="button--submit auth__form-group">
            Sign up
          </button>
        </form>
        <p className="auth__redirect">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  ) : (
    <Redirect to="/" />
  );
}

export default SignUp;
