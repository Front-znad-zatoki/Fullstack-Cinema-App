import { useState } from 'react';

function OrderItem({ id }) {
  // TODO: prepare async action to send delete request and get details
  const [showDetails, setShowDetails] = useState(false);
  const deleteOrder = () => {
    console.log('deleteing order');
  };
  const getOrderDetails = () => {
    console.log('getting order details');
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
        {showDetails ? 'Show Details' : 'Hide Details'}
      </button>
      {showDetails ? <p>OrderDetaisl</p> : null}
    </li>
  );
}

export default OrderItem;
