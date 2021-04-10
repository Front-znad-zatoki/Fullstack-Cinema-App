import { useContext } from 'react';
import { ThemeContext } from '../../context/Theme';
import AppTheme from '../../context/Theme/themeColors';
import './style.scss';
import MovieSlider from '../MovieSlider';
import { AuthContext } from '../../context/Auth';
import Repertoire from '../Repertoire';
import CinemaHall from '../../components/CinemaHall';

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
      Rendering Landing Page
      <MovieSlider />
      <Repertoire />
    </div>
  );
}

export default Landing;
