import { useContext } from 'react';
import { ThemeContext } from '../../context/Theme';
import AppTheme from '../../context/Theme/themeColors';
import './style.scss';
import MovieSlider from '../MovieSlider';
import Repertoire from '../Repertoire';

function Landing() {
  const theme = useContext(ThemeContext)[0];
  const currentTheme = AppTheme[theme];
  return (
    <div
      className="landing"
      style={{
        backgroundColor: `${currentTheme.backgroundColor}`,
        color: `${currentTheme.textColor}`,
      }}
    >
      <MovieSlider />
      <Repertoire />
    </div>
  );
}

export default Landing;
