import { useState } from 'react';
import UserDataUpdateForm from '../UserDataUpdateForm';

function UserListItem({ title, text = '' }) {
  const [showChange, setshowChange] = useState(false);
  const handleClick = async () => {
    setshowChange((prevState) => !prevState);
  };
  return (
    <li className="profile__list-item">
      <p>
        {title}: <span className="profile__list-item--bold">{text}</span>
      </p>
      <button className="button--submit" onClick={handleClick}>
        {showChange ? 'Hide' : `Change ${title}`}
      </button>
      {showChange ? (
        <UserDataUpdateForm setshowChange={setshowChange} title={title} />
      ) : null}
    </li>
  );
}

export default UserListItem;
