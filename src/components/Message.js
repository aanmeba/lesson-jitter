import { Link } from "react-router-dom";

const Message = ({ message }) => {
  return (
    <>
      <h4>{message.text}</h4>
      <p>{message.user}</p>
      <Link to={`/messages/${message.id}`}>View detail</Link>
    </>
  );
};

export default Message;
