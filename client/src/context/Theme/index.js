import React, { createContext, useState } from 'react';

export const ThemeContext = createContext(['light', () => {}]);

function ThemeContextProvider() {
  const [theme, setTheme] = useState(0);

  return <div />;
}

export default ThemeContextProvider;
