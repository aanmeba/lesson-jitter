import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../utils/stateContext";

const MessageForm = () => {
  const { store, dispatch } = useGlobalState();
  const { loggedInUser, messageList } = store;

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
      addMessage(formData.text);
      cleanMessage();
      navigate("/messages");
    }
  };

  const addMessage = (text) => {
    // this logic can be in reducer under 'setMessageList / addMessage' cases
    const message = {
      id: messageList[0].id + 1,
      text: text,
      user: loggedInUser,
    };
    dispatch({
      type: "addMessage",
      data: message,
    });
  };

  const cleanMessage = (e) => {
    // e.preventDefault();
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
        <input type="submit" value="Post" />
        <button onClick={cleanMessage}>Clear</button>
      </form>
    </>
  );
};

export default MessageForm;
