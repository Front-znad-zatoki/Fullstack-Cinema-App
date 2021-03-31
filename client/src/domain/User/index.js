import { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { loadUser, logout } from '../../actions/Auth';
import { AuthContext } from '../../context/Auth';
import { ThemeContext } from '../../context/Theme';
import AppTheme from '../../context/Theme/themeColors';
import UserListItem from './UserItem';

export default function UserDashboard() {
  const { userContext, dispatchUserContext } = useContext(AuthContext);
  const { isAuthenticated, user } = userContext;
  const theme = useContext(ThemeContext)[0];
  const currentTheme = AppTheme[theme];
  console.log(userContext);
  useEffect(() => {
    loadUser(dispatchUserContext);
  }, []);

  return isAuthenticated ? (
    <div
      className="navbar"
      style={{
        backgroundColor: `${currentTheme.backgroundColor}`,
        color: `${currentTheme.textColor}`,
      }}
    >
      Redering Dashboard
      <ul className="profile__list">
        <UserListItem title="Name" text={user.name} />
        <UserListItem title="Surname" text={user.surname} />
        <UserListItem title="Email" text={user.email} />
        <UserListItem title="Phone" text={user.phone} />
        <UserListItem title="Orders" text="orders here" />
      </ul>
    </div>
  ) : (
    <Redirect to="/login" />
  );
}
