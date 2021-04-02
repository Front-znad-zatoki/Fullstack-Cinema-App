/* eslint-disable no-underscore-dangle */
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/Auth';
import { ThemeContext } from '../../../context/Theme';
import AppTheme from '../../../context/Theme/themeColors';
import OrderItem from '../OrderItem';

function OrderList({ callback }) {
  const { userContext, dispatchUserContext } = useContext(AuthContext);
  const { isAuthenticated, user } = userContext;
  const theme = useContext(ThemeContext)[0];
  const currentTheme = AppTheme[theme];
  // TODO: add action logic
  console.log(user.orders);
  const userOrders = user.orders
    ? user.orders.map((order) => {
        return <OrderItem key={order._id} id={order._id} />;
      })
    : undefined;
  return (
    <div
      className="orders"
      style={{
        backgroundColor: `${currentTheme.backgroundColor}`,
        color: `${currentTheme.textColor}`,
      }}
    >
      <h2>Orders</h2>
      <ul>{userOrders !== undefined ? userOrders : <li>No orders</li>}</ul>
    </div>
  );
}

export default OrderList;
