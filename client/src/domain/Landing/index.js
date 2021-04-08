import { useContext } from 'react';
import { ThemeContext } from '../../context/Theme';
import AppTheme from '../../context/Theme/themeColors';
import MovieList from '../MovieList';
import './style.scss';
import MovieSlider from '../MovieSlider';
import { checkIfIsAuthenticated } from '../../actions/Auth';
import { AuthContext } from '../../context/Auth';
import Repertoire from '../Repertoire';

function Landing() {
  const theme = useContext(ThemeContext)[0];
  const currentTheme = AppTheme[theme];
  const { userContext, dispatchUserContext } = useContext(AuthContext);
  const { isAuthenticated } = userContext;

  // TODO: move authentication to prescreening
  // const handleOnClick = () => {
  //   checkIfIsAuthenticated(dispatchUserContext);
  // };
  return (
    <div
      className="landing"
      style={{
        backgroundColor: `${currentTheme.backgroundColor}`,
        color: `${currentTheme.textColor}`,
      }}
    >
      Rendering Landing Page
      {/* <button onClick={handleOnClick}>Get cookies</button> */}
      <MovieSlider />
      <Repertoire />
    </div>
  );
}

export default Landing;
