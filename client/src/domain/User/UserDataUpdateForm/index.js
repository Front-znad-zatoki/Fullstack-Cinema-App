import { useState, useContext } from 'react';
import { changeUsersData } from '../../../actions/User';
import Message from '../../../components/Message';
import { AuthContext } from '../../../context/Auth';

function UserDataUpdateForm({ title }) {
  const [formData, setFormData] = useState(null);
  const [alertMsg, setAlertMsg] = useState(null);
  const { userContext, dispatchUserContext } = useContext(AuthContext);
  // const { isAuthenticated, user } = userContext;

  const onChange = (event) => {
    setFormData({ [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('changing');
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
    }
  };

  return (
    <>
      {alertMsg ? <Message message={alertMsg} /> : null}

      <form onSubmit={handleSubmit}>
        <label htmlFor={title}>
          New {title}:
          <input
            type="text"
            required
            name={title}
            placeholder={title}
            name={title}
            onChange={onChange}
            minLength="5"
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default UserDataUpdateForm;
