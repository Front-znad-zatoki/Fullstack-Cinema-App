import React from 'react';

function OrderItem({ id, details, callback }) {
  const handleClick = async () => {
    callback();
  };
  return (
    <li className="order__list-item">
      <p>
        Rendering order item
        {/* {id}: <span className="order__list-item--bold" /> */}
        {/* {details} */}
      </p>
      <button onClick={handleClick}>Delete order: {id} </button>
    </li>
  );
}

export default OrderItem;
