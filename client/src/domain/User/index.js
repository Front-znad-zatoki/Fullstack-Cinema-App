import { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { loadUser } from '../../actions/Auth';
import { AuthContext } from '../../context/Auth';
import { ThemeContext } from '../../context/Theme';
import AppTheme from '../../context/Theme/themeColors';
import OrderList from '../Orders/OrderList';
import UserListItem from './UserItem';
import './style.scss';
import CustomLoader from '../../components/Loader';

export default function UserDashboard() {
  const [loading, setLoading] = useState(false);
  const { userContext, dispatchUserContext } = useContext(AuthContext);
  const { isAuthenticated, user } = userContext;
  const theme = useContext(ThemeContext)[0];
  const currentTheme = AppTheme[theme];
  useEffect(() => {
    setLoading(true);
    loadUser(dispatchUserContext, setLoading);
  }, []);

  const userDataToRender = ['name', 'surname', 'phone', 'email'];
  if (loading) return <CustomLoader />;

  return isAuthenticated ? (
    <div
      className="dashboard app-container"
      style={{
        backgroundColor: `${currentTheme.backgroundColor}`,
        color: `${currentTheme.textColor}`,
      }}
    >
      <h3 className="dashboard__header">YOUR DATA</h3>
      <ul className="profile__list">
        {userDataToRender.map((title) => {
          return <UserListItem key={title} title={title} text={user[title]} />;
        })}
      </ul>
      {user ? <OrderList /> : null}
    </div>
  ) : (
    <Redirect to="/login" />
  );
}
