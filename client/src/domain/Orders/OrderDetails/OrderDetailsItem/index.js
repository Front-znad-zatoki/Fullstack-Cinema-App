import React from 'react';

function OrderDetailsItem({ title, data }) {
  return (
    <li className="profile__list-details__item">
      {title}:
      <span className="profile__list-details__item--bold" />
      {data}
    </li>
  );
}

export default OrderDetailsItem;
