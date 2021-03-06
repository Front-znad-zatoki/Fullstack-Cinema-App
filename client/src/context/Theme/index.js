import React, { createContext, useState } from 'react';

export const ThemeContext = createContext(['light', () => {}]);

function ThemeComponent() {
  const [theme, setTheme] = useState(0);

  return <div />;
}

export default ThemeComponent;
