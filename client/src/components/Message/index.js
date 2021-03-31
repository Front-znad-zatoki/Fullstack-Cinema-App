const Message = ({ message, type = 'danger' }) => {
  return (
    <div className={type} role="alert">
      {message}
    </div>
  );
};

export default Message;
