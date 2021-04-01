import { useContext, useEffect } from 'react';
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
  // TODO: add logic to actions
  const handleNameChange = async () => {
    console.log('changing name');
  };
  const handleSurnameChange = async () => {
    console.log('changing surname');
  };
  const handleEmailChange = async () => {
    console.log('changing email');
  };
  const handlePhoneChange = async () => {
    console.log('changing phone');
  };

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
        <UserListItem
          title="Name"
          text={user ? user.name : ''}
          callback={handleNameChange}
        />
        <UserListItem
          title="Surname"
          text={user ? user.surname : ''}
          callback={handleSurnameChange}
        />
        <UserListItem
          title="Email"
          text={user ? user.email : ''}
          callback={handleEmailChange}
        />
        <UserListItem
          title="Phone"
          text={user ? user.phone : ''}
          callback={handlePhoneChange}
        />
      </ul>
      {user ? <OrderList /> : null}
    </div>
  ) : (
    <Redirect to="/login" />
  );
}
