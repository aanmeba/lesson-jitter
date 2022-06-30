import { Button, TextField, InputLabel, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../services/authServices";
import { useGlobalState } from "../utils/stateContext";

const SignupForm = () => {
  const { dispatch } = useGlobalState();
  const navigate = useNavigate();

  const initialFormData = {
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState(null);
  // const [error, setError] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    signUp(formData)
      .then((user) => {
        console.log(user);
        let errorMessage = "";
        if (user.error) {
          console.log(user.error);
          // convert the object into a string
          // const { username, email } = user.error;
          // setError({ username: username, email: email });

          Object.keys(user.error).forEach((key) => {
            // console.log(key, user.error[key]);
            errorMessage = errorMessage.concat(
              "\n",
              `${key} ${user.error[key]}`
            );
          });
          setError(errorMessage);
        } else {
          setError(null);
          sessionStorage.setItem("username", user.username);
          sessionStorage.setItem("token", user.jwt);
          dispatch({
            type: "setLoggedInUser",
            data: user.username,
          });
          dispatch({
            type: "setToken",
            data: user.jwt,
          });
          setFormData(initialFormData); // cleaning up the input field
          navigate("/messages");
        }
      })
      .catch((e) => console.log(e));
  };

  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Typography variant="h4">Register User</Typography>
      {error && <p>{error}</p>}
      {/* {error &&
        (error.username || error.email) &&
        ((error.username && <p>username {error.username}</p>) ||
          (error.email && <p>email {error.email}</p>))} */}
      <form onSubmit={handleSubmit}>
        <div>
          <InputLabel>Username: </InputLabel>
          <TextField
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleFormData}
          />
        </div>
        <div>
          <InputLabel>Email: </InputLabel>
          <TextField
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleFormData}
          />
        </div>
        <div>
          <InputLabel htmlFor="password">Password: </InputLabel>
          <TextField
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleFormData}
          />
        </div>
        <div>
          <InputLabel htmlFor="password">Password Confirmation: </InputLabel>
          <TextField
            type="password"
            name="password_confirmation"
            id="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleFormData}
          />
        </div>
        <div>
          <Button type="submit" variant="contained">
            Sign Up
          </Button>
        </div>
      </form>
    </>
  );
};

export default SignupForm;
