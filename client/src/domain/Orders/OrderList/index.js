/* eslint-disable no-underscore-dangle */
import { useContext } from 'react';
import { AuthContext } from '../../../context/Auth';
import OrderItem from '../OrderItem';
import { deleteUsersOrder } from '../../../actions/Orders';
import { loadUser } from '../../../actions/Auth';

function OrderList({ callback }) {
  const { userContext, dispatchUserContext } = useContext(AuthContext);
  const { user } = userContext;
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
