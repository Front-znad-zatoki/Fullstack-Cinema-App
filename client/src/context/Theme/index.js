import React, { createContext } from 'react';

export const ThemeContext = createContext(['light', () => {}]);

function ThemeComponent() {
  return <div />;
}

export default ThemeComponent;
