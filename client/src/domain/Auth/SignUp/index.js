import './style.scss';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordRepeat: '',
  });

  const { name, email, password, passwordRepeat } = formData;

  const onChange = (event) =>
    setFormData({ ...formData, [event.target.name]: event.target.value });

  const onSubmit = (event) => {
    event.preventDefault();
    if (password !== passwordRepeat) {
      alert('Passwords are not the same');
    }
    console.log({ name, email, password });
  };

  // TODO: add context to retrieve info if the user is already authenticated
  // if (isAuthenticated) {
  //   return <Redirect to="/user/me" />;
  // }

  return (
    <div className="signup">
      <h1>Sign Up</h1>
      <form className="signup__form" onSubmit={onSubmit}>
        <div className="signup__form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={onChange}
          />
        </div>
        <div className="signup__form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
          />
        </div>
        <div className="signup__form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <div className="signup__form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="passwordRepeat"
            value={passwordRepeat}
            onChange={onChange}
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
  );
}

export default SignUp;
