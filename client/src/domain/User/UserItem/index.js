import React from 'react';

function UserListItem({ title, text }) {
  return (
    <li className="profile__list-item">
      <p>
        {title}: <span className="profile__list-item--bold" />
        {text}
      </p>
    </li>
  );
}

export default UserListItem;
