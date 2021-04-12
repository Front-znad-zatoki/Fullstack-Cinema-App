/* eslint-disable no-underscore-dangle */
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/Auth';
import { ThemeContext } from '../../../context/Theme';
import AppTheme from '../../../context/Theme/themeColors';
import OrderItem from '../OrderItem';
import { getUsersOrder, deleteUsersOrder } from '../../../actions/Orders';
import { loadUser } from '../../../actions/Auth';

function OrderList({ callback }) {
  const { userContext, dispatchUserContext } = useContext(AuthContext);
  const { user, isAuthenticated } = userContext;
  const theme = useContext(ThemeContext)[0];
  const currentTheme = AppTheme[theme];
  // TODO: add action logic
  // console.log(user.orders);
  const handleOrderDelete = async (id, dispatch) => {
    const wasUserDeleted = deleteUsersOrder(id, dispatch);
    if (wasUserDeleted) {
      alert('Order deleted');
      loadUser(dispatchUserContext);
      return;
    }
    alert('Cannot delete order at this moment');
  };

  const userOrders = user.orders
    ? user.orders.map((order) => {
        return (
          <OrderItem
            key={order._id}
            id={order._id}
            callback={handleOrderDelete}
          />
        );
      })
    : undefined;
  return (
    <>
      <h2 className="dashboard__header">ORDERS</h2>
      <ul className="profile__list">
        {userOrders !== undefined ? userOrders : <li>No orders</li>}
      </ul>
    </>
  );
}

export default OrderList;
