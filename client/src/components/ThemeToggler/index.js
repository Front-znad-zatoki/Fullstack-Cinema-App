import React, { useContext } from 'react';
import { ThemeContext } from '../../context/Theme';

const themeTogglerStyle = {
  cursor: 'pointer',
};
const ThemeToggler = () => {
  const [themeMode, setThemeMode] = useContext(ThemeContext);
  return (
    <button
      style={themeTogglerStyle}
      onClick={() => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light');
      }}
    >
      <span title="switch theme">{themeMode === 'light' ? '🌙' : '☀️'}</span>
    </button>
  );
};

export default ThemeToggler;
