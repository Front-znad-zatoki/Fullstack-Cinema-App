/* eslint-disable react/state-in-constructor */
/* eslint-disable react/destructuring-assignment */
import { useContext, useEffect, useState, Component } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../context/Theme';
import AppTheme from '../../context/Theme/themeColors';

class ErrorBoundary extends Component {
  state = {
    hasError: false,
    error: { message: '', stack: '' },
    info: { componentStack: '' },
  };

  static getDerivedStateFromError = (error) => {
    return { hasError: true };
  };

  componentDidCatch = (error, info) => {
    this.setState({ error, info });
  };

  render() {
    const { hasError, error, info } = this.state;
    const { children } = this.props;

    return hasError ? <ErrorComponent error={error} info={info} /> : children;
  }
}

const ErrorComponent = ({ error, info }) => {
  const theme = useContext(ThemeContext)[0];
  const currentTheme = AppTheme[theme];
  const handleClick = () => {
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };
  return (
    <div
      className="errorBoundary"
      style={{
        backgroundColor: `${currentTheme.backgroundColor}`,
        color: `${currentTheme.textColor}`,
      }}
    >
      <h2>
        Something went wrong. Click below to be redirected to the main page.
      </h2>
      <Link to="/" onClick={handleClick}>
        Main Page
      </Link>
    </div>
  );
};

export default ErrorBoundary;
