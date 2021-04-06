import { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { loadUser } from '../../actions/Auth';
import { AuthContext } from '../../context/Auth';
import { ThemeContext } from '../../context/Theme';
import AppTheme from '../../context/Theme/themeColors';
import OrderList from '../Orders/OrderList';
import UserListItem from './UserItem';

export default function UserDashboard() {
  const { userContext, dispatchUserContext } = useContext(AuthContext);
  const { isAuthenticated, user } = userContext;
  const theme = useContext(ThemeContext)[0];
  const currentTheme = AppTheme[theme];
  useEffect(() => {
    loadUser(dispatchUserContext);
  }, []);

  const userDataToRender = ['name', 'surname', 'phone', 'email'];
  return isAuthenticated ? (
    <div
      className="dashboard"
      style={{
        backgroundColor: `${currentTheme.backgroundColor}`,
        color: `${currentTheme.textColor}`,
      }}
    >
      Redering Dashboard
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
