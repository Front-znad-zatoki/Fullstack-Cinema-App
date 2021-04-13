import { useState, useContext } from 'react';
import { changeUsersData } from '../../../actions/User';
import Message from '../../../components/Message';
import { AuthContext } from '../../../context/Auth';

function UserDataUpdateForm({ title, setshowChange }) {
  const [formData, setFormData] = useState(null);
  const [alertMsg, setAlertMsg] = useState(null);
  const { dispatchUserContext } = useContext(AuthContext);

  const onChange = (event) => {
    setFormData({ [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const changedData = await changeUsersData(
      title,
      formData,
      dispatchUserContext,
    );
    if (!changedData) {
      setAlertMsg(`Could not change ${title}. Try again`);
      setTimeout(() => {
        setAlertMsg(null);
      }, 2000);
      return;
    }
    setAlertMsg(`Your ${title} changed.`);
    setTimeout(() => {
      setAlertMsg(null);
      setshowChange((prevState) => !prevState);
    }, 2000);
  };

  return (
    <>
      {alertMsg ? <Message message={alertMsg} /> : null}
      <form className="profile__form" onSubmit={handleSubmit}>
        <label htmlFor={title}>
          <input
            type="text"
            required
            name={title}
            placeholder={`new ${title}`}
            onChange={onChange}
            minLength="5"
          />
        </label>
        <button className="button--submit" type="submit">
          Submit
        </button>
      </form>
    </>
  );
}

export default UserDataUpdateForm;
