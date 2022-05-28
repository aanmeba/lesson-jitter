import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MessageForm = ({ logginedUser, addMessage }) => {
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
            placeholder={`What's on your mind ${logginedUser}`}
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
