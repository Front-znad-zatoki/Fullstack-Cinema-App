/* eslint-disable no-underscore-dangle */
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
  const userOrders = user.orders
    ? user.orders.map((order) => {
        console.log(order._id);
        return <OrderItem key={order._id} id={order._id} />;
      })
    : undefined;
  return (
    <div
      className="navbar"
      style={{
        backgroundColor: `${currentTheme.backgroundColor}`,
        color: `${currentTheme.textColor}`,
      }}
    >
      <h2>Orders</h2>
      <ul>{userOrders}</ul>
    </div>
  );
}

export default OrderList;
