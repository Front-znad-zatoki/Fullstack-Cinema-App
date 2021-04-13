import Loader from 'react-loader-spinner';
import { useContext } from 'react';
import AppTheme from '../../context/Theme/themeColors';
import { ThemeContext } from '../../context/Theme';

function CustomLoader() {
  const theme = useContext(ThemeContext)[0];
  const currentTheme = AppTheme[theme];
  return (
    <Loader
      type="ThreeDots"
      color="#6e093a"
      height={100}
      width={100}
      //   timeout={2000}
      style={{
        backgroundColor: `${currentTheme.backgroundColor}`,
        color: `${currentTheme.textColor}`,
        textAlign: 'center',
      }}
    />
  );
}

export default CustomLoader;
