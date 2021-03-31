import { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { loadUser, logout } from '../../../actions/Auth';
import Message from '../../../components/Message';
import { AuthContext } from '../../../context/Auth';
import { ThemeContext } from '../../../context/Theme';
import AppTheme from '../../../context/Theme/themeColors';
import OrderItem from '../OrderItem';

function OrderList({ callback }) {
  const { userContext, dispatchUserContext } = useContext(AuthContext);
  const { isAuthenticated, user } = userContext;
  const theme = useContext(ThemeContext)[0];
  const currentTheme = AppTheme[theme];
  console.log(userContext);
  // TODO: add action logic
  const getOrders = () => {
    console.log('getting orders', user.orders);
  };
  useEffect(() => {
    getOrders(dispatchUserContext);
  }, []);

  return (
    <div
      className="navbar"
      style={{
        backgroundColor: `${currentTheme.backgroundColor}`,
        color: `${currentTheme.textColor}`,
      }}
    >
      <h2>Orders</h2>
      <ul>
        {user.orders.map((order) => {
          return <OrderItem key={order.id} id={order.id} />;
        })}
      </ul>
    </div>
  );
}

export default OrderList;
