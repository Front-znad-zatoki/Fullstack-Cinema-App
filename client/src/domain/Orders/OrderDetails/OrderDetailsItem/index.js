import React from 'react';

function OrderDetailsItem({ title, data }) {
  return (
    <li className="order__details">
      {title}:
      <span className="order__details--bold" />
      {data}
    </li>
  );
}

export default OrderDetailsItem;
