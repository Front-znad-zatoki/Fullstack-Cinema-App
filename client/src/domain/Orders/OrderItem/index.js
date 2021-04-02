import { useEffect, useState } from 'react';

import { getUsersOrder } from '../../../actions/Orders';
import OrderDetails from '../OrderDetails';

function OrderItem({ id }) {
  // TODO: prepare async action to send delete request and get details
  const [showDetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState({ id });

  useEffect(() => {
    let isCancelled = false;
    const fetchOrder = async () => {
      try {
        if (!isCancelled) {
          const res = await getUsersOrder(id);
          console.log(res);
          if (res && res.data) setDetails(res.data);
        }
      } catch (err) {
        if (!isCancelled) throw err;
      }
    };
    fetchOrder();
    return () => {
      isCancelled = true;
    };
  }, []);

  const deleteOrder = () => {
    console.log('deleteing order');
  };
  const handleOrderDelete = async () => {
    deleteOrder();
  };
  const handleShowDetails = async () => {
    setShowDetails((prevState) => !prevState);
  };
  return (
    <li className="order__list-item">
      <p>
        Rendering order item
        {id}: <span className="order__list-item--bold" />
      </p>
      <button onClick={handleOrderDelete}>Delete order: {id} </button>
      <button onClick={handleShowDetails}>
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>
      {showDetails ? <OrderDetails details={details.order} /> : null}
    </li>
  );
}

export default OrderItem;
