import ThemeContext from '../../context/Theme';
import React, { useContext } from 'react';

const themeTogglerStyle = {
  cursor: 'pointer',
};
const ThemeToggler = () => {
  const [themeMode, setThemeMode] = useContext(ThemeContext);
  return (
    <div
      style={themeTogglerStyle}
      onClick={() => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light');
      }}
    >
      <span title="switch theme">{themeMode === 'light' ? '🌙' : '☀️'}</span>
    </div>
  );
};

export default ThemeToggler;
