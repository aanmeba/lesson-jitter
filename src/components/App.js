import React, { useReducer, useEffect } from "react";
import LoginForm from "./LoginForm";
import MessageForm from "./MessageForm";
import Messages from "./Messages";
import MessageDetail from "./MessageDetail";
import Navigation from "./Navigation";
// import initialMessageList from "../data/message-list.json";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import About from "./About";
import NotFound from "./NotFound";
import { reducer } from "../utils/reducer";
import { StateContext } from "../utils/stateContext";
import SignupForm from "./SignupForm";
import { getMessages } from "../services/messagesServices";
// import axios from "axios";

const App = () => {
  // useReducer handles all the states in the same object
  const initialState = {
    messageList: [],
    loggedInUser: sessionStorage.getItem("username") || null,
    token: sessionStorage.getItem("token") || null,
  };

  // useReducer receives two arguments
  // - reducer -> it is the function that is executed when...
  // - state
  // it returns an array with two elements
  // - store -> actually that's the name for the state
  // - dispatch -> is the function that triggers the reducer function, dispatch's argument is action
  const [store, dispatch] = useReducer(reducer, initialState);
  const { loggedInUser } = store;

  useEffect(() => {
    getMessages()
      .then((messages) => {
        dispatch({
          type: "setMessageList",
          data: messages,
        });
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div>
      {/*** Wrap all the components that use global states like loggedInUser and messageList in the state context provider*/}
      <StateContext.Provider value={{ store, dispatch }}>
        {/*** Wrap all the components involved in the app's routing */}
        <Router>
          {/*** Navigation isn't a part of routes  */}
          {/*** It is in the brower router because it uses the Link component */}
          <Navigation />
          <Routes>
            <Route path="/" element={<Navigate to="messages" replace />} />
            {/*** Nested Routes  */}
            <Route path="messages">
              <Route index element={<Messages />} />
              <Route
                path="new"
                element={
                  loggedInUser ? <MessageForm /> : <Navigate to="/login" />
                }
              />
              <Route path=":messageId" element={<MessageDetail />} />
              <Route path="mymessages" element={<Messages />} />
              <Route path="user/:username" element={<Messages />} />
            </Route>
            <Route path="about" element={<About />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="signup" element={<SignupForm />} />
            {/*** for everything else routes render NotFound component */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </StateContext.Provider>
    </div>
  );
};

export default App;
