import React, { createContext, useState } from 'react';

export const ThemeContext = React.createContext(['light', () => {}]);

function ThemeComponent() {
  const [theme, setTheme] = useState(0);

  return <div></div>;
}

export default ThemeComponent;
