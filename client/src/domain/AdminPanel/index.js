import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/Auth';
import { ThemeContext } from '../../context/Theme';
import AppTheme from '../../context/Theme/themeColors';
import './style.scss';
import NotFound from '../../components/NotFound';
import CollectionTable from './CollectionTable';

function AdminPanel() {
  const theme = useContext(ThemeContext)[0];
  const currentTheme = AppTheme[theme];
  const { userContext } = useContext(AuthContext);
  const { isAuthenticated, user } = userContext;
  const [collectionToDisplay, setCollectionToDisplay] = useState(null);
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
    setCollectionToDisplay(event.target.value);
  };
  useEffect(() => {}, [collectionToDisplay]);
  return isAuthenticated && user.isAdmin ? (
    <div
      className="admin"
      style={{
        backgroundColor: `${currentTheme.backgroundColor}`,
        color: `${currentTheme.textColor}`,
      }}
    >
      <div className="admin__panel">
        <div className="button-group admin__buttons">
          <h3>ADMIN PANEL</h3>
          {collectionName.map((collection) => {
            return (
              <button
                onClick={handleTableShow}
                key={collection}
                className="button--submit admin__button"
                value={collection}
              >
                {collection}
              </button>
            );
          })}
        </div>
        {collectionToDisplay ? (
          <CollectionTable collectionName={collectionToDisplay} />
        ) : (
          <div className="admin__table">
            <h4 className="admin__table__header">
              {`<< `}Click on the data you want to display
            </h4>
          </div>
        )}
      </div>
    </div>
  ) : (
    <NotFound />
  );
}

export default AdminPanel;
