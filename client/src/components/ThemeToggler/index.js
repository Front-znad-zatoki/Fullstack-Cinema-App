import React, { useContext } from 'react';
import { ThemeContext } from '../../context/Theme';

const themeTogglerStyle = {
  cursor: 'pointer',
};
const ThemeToggler = () => {
  const [themeMode, setThemeMode] = useContext(ThemeContext);
  const appRoot = document.getElementById('root');
  return (
    <button
      style={themeTogglerStyle}
      onClick={() => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light');
        appRoot.classList.toggle('dark-mode');
        appRoot.classList.toggle('light-mode');
      }}
    >
      <span title="switch theme">{themeMode === 'light' ? '🌙' : '☀️'}</span>
    </button>
  );
};

export default ThemeToggler;
