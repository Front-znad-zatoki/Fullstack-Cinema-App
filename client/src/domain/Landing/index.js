import { useContext } from 'react';
import { ThemeContext } from '../../context/Theme';
import AppTheme from '../../context/Theme/themeColors';
import MovieList from '../MovieList';
import './style.scss';
import MovieSlider from '../MovieSlider';
import Seat from '../Seat';

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
      <MovieList />
      <Seat />
    </div>
  );
}

export default Landing;
