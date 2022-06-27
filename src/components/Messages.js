import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  getMessages,
  getMyMessages,
  getMessagesByUser,
} from "../services/messagesServices";
import { useGlobalState } from "../utils/stateContext";
import Message from "./Message";

const Messages = () => {
  const { store, dispatch } = useGlobalState();
  const { messageList } = store;
  const [error, setError] = useState(null);
  const location = useLocation();
  const params = useParams();

  useEffect(() => {
    setError(null);
    if (location.pathname === "/messages/mymessages") {
      getMyMessages()
        .then((messages) => {
          dispatch({
            type: "setMessageList",
            data: messages,
          });
        })
        .catch((e) => console.log(e));
    } else if (params.username) {
      getMessagesByUser(params.username)
        .then((messages) => {
          console.log(messages);
          if (messages.error) {
            setError(`${params.username} doesn't exist`);
          } else {
            dispatch({
              type: "setMessageList",
              data: messages,
            });
          }
        })
        .catch((e) => console.log(e));
    } else {
      getMessages()
        .then((messages) => {
          dispatch({
            type: "setMessageList",
            data: messages,
          });
        })
        .catch((e) => console.log(e));
    }
  }, [location]); // eslint-disable-line

  return (
    <>
      {/* {error && <p>{error}</p>} */}
      {error ? (
        <p>{error}</p>
      ) : (
        messageList.map((message) => (
          <Message key={message.id} message={message} />
        ))
      )}
    </>
  );
};

export default Messages;
