import React from 'react';

function UserListItem({ title, text, callback }) {
  const handleClick = async () => {
    callback();
  };
  return (
    <li className="profile__list-item">
      <p>
        {title}: <span className="profile__list-item--bold" />
        {text}
      </p>
      <button onClick={handleClick}>Change {title} </button>
    </li>
  );
}

export default UserListItem;
