import React from 'react';

function UserDataUpdateForm({ title }) {
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('changing');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor={title}>
        New {title}:
        <input type="text" name={title} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default UserDataUpdateForm;
