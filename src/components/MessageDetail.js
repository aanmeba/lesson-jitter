import { Card, CardContent, Typography } from "@mui/material";
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
        <Card>
          <CardContent>
            <Typography variant="h6">{message.text}</Typography>
            <Typography>{message.user}</Typography>
          </CardContent>
        </Card>
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
