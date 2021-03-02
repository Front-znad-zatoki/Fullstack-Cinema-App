import { useContext } from 'react';
import Navbar from '../../components/Navbar';
import { ThemeContext } from '../../context/Theme';
import AppTheme from '../../context/Theme/themeColors';
import './style.scss';

function Landing() {
  const theme = useContext(ThemeContext)[0];
  const currentTheme = AppTheme[theme];
  return (
    <div
      className="landing"
      style={{
        padding: '1rem',
        backgroundColor: `${currentTheme.backgroundColor}`,
        color: `${currentTheme.textColor}`,
      }}
    >
      Rendering Landing Page
      <Navbar />
    </div>
  );
}

export default Landing;
