import './style.scss';
import React, { useState, useContext, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { ThemeContext } from '../../../context/Theme';
import AppTheme from '../../../context/Theme/themeColors';
import { register } from '../../../actions/Auth';
import { AuthContext } from '../../../context/Auth';
import Message from '../../../components/Message';

function SignUp({ history }) {
  // TODO: Check cookies
  const { userContext, dispatchUserContext } = useContext(AuthContext);
  const { isAuthenticated, user } = userContext;
  const theme = useContext(ThemeContext)[0];
  const currentTheme = AppTheme[theme];
  const [alertMsg, setAlertMsg] = useState(null);
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
      console.log('nope no can do');
      setAlertMsg('Could not register user. Try again');
      return;
    }
    // resetForm();
    console.log(user);
  };

  return isAuthenticated ? (
    <div
      className="signup"
      style={{
        backgroundColor: `${currentTheme.backgroundColor}`,
        color: `${currentTheme.textColor}`,
      }}
    >
      <h2>Sign Up</h2>
      {alertMsg ? <Message message={alertMsg} /> : null}

      <form className="signup__form" onSubmit={onSubmit}>
        <div className="signup__form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className="signup__form-group">
          <input
            type="text"
            placeholder="Surname"
            name="surname"
            value={surname}
            onChange={onChange}
            required
          />
        </div>

        <div className="signup__form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="signup__form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <div className="signup__form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="passwordRepeat"
            value={passwordRepeat}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit" className="button--submit">
          Sign up
        </button>
      </form>
      <p className="signup__redirect">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </div>
  ) : (
    <Redirect to="/" />
  );
}

export default SignUp;
