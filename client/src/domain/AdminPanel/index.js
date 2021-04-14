import { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { loadUser } from '../../actions/Auth';
import { AuthContext } from '../../context/Auth';
import { ThemeContext } from '../../context/Theme';
import AppTheme from '../../context/Theme/themeColors';
import './style.scss';
import CustomLoader from '../../components/Loader';

function AdminPanel() {
  const theme = useContext(ThemeContext)[0];
  const currentTheme = AppTheme[theme];
  const [loading, setLoading] = useState(false);
  const { userContext, dispatchUserContext } = useContext(AuthContext);
  const { isAuthenticated, user } = userContext;
  const collectionName = [
    'movies',
    'cinemas',
    'cinemaHalls',
    'seats',
    'screenings',
    'orders',
    'tickets',
    'users',
  ];
  const handleTableShow = (event) => {
    console.log(event.target);
  };
  return (
    <div
      className="admin"
      style={{
        backgroundColor: `${currentTheme.backgroundColor}`,
        color: `${currentTheme.textColor}`,
      }}
    >
      <h3>ADMIN PANEL</h3>
      <div className="button-group admin__buttons">
        {collectionName.map((collection) => {
          return (
            <button
              onClick={handleTableShow}
              key={collection}
              className="button--submit admin__button"
            >
              {collection}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default AdminPanel;
