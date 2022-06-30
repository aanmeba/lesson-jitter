import { Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createMessage } from "../services/messagesServices";
import { useGlobalState } from "../utils/stateContext";

const MessageForm = () => {
  const { store, dispatch } = useGlobalState();
  const { loggedInUser } = store;

  const navigate = useNavigate();
  const initialFormData = {
    text: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.text === "") {
      console.log("empty message");
    } else {
      console.log(formData);
      addMessage(formData);
      cleanMessage();
    }
  };

  const addMessage = (data) => {
    createMessage(data).then((message) => {
      dispatch({
        type: "addMessage",
        data: message,
      });
      navigate("/messages");
    });
  };

  const cleanMessage = () => {
    setFormData(initialFormData);
  };

  return (
    <>
      <p></p>
      <form onSubmit={handleSubmit}>
        <div>
          <textarea
            type="text"
            name="text"
            id="text"
            placeholder={`What's on your mind ${loggedInUser}`}
            value={formData.text}
            onChange={handleFormData}
          ></textarea>
        </div>
        <Button type="submit" variant="contained">
          Post Message
        </Button>
        <Button onClick={cleanMessage} variant="contained">
          Clear Message
        </Button>
      </form>
    </>
  );
};

export default MessageForm;
