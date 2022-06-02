import { Link, useParams } from "react-router-dom";
import { useGlobalState } from "../utils/stateContext";

const MessageDetail = () => {
  const { store } = useGlobalState();
  const { messageList } = store;

  const params = useParams();
  console.log(params);

  const getMessage = (id) => {
    return messageList.find((m) => m.id === parseInt(id));
  };

  const message = getMessage(params.messageId);

  return (
    <>
      {message ? (
        <>
          <h4>{message.text}</h4>
          <p>{message.user}</p>
        </>
      ) : (
        <>
          <p>Message not found</p>
          <Link to="/messages">Go back to the main page</Link>
        </>
        // <Navigate to="/notFound" />
      )}
    </>
  );
};

export default MessageDetail;
