import { Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Message = ({ message }) => {
  return (
    <Card>
      <CardContent>
        {/* relative path - Link to={`${message.id}`} */}
        <Link to={`/messages/${message.id}`} style={{ textDecoration: "none" }}>
          <Typography variant="h6">{message.text}</Typography>
        </Link>
        <Link to={`/messages/user/${message.username}`}>
          <Typography>{message.username}</Typography>
        </Link>
        <Typography variant="p">{message.posted}</Typography>
      </CardContent>
    </Card>
  );
};

export default Message;
