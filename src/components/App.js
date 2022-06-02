import React, { useEffect, useReducer } from "react";
import LoginForm from "./LoginForm";
import MessageForm from "./MessageForm";
import Messages from "./Messages";
import MessageDetail from "./MessageDetail";
import Navigation from "./Navigation";
import initialMessageList from "../data/message-list.json";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import About from "./About";
import NotFound from "./NotFound";
import { reducer } from "../utils/reducer";

const App = () => {
  // useReducer handles all the states in the same object
  const initialState = {
    messageList: [],
    loggedInUser: "",
  };

  // useReducer receives two arguments
  // - reducer -> it is the function that is executed when...
  // - state
  // it returns an array with two elements
  // - store -> actually that's the name for the state
  // - dispatch -> is the function that triggers the reducer function, dispatch's argument is action
  const [store, dispatch] = useReducer(reducer, initialState);
  const { messageList, loggedInUser } = store;

  const activateUser = (username) => {
    dispatch({
      type: "setLoggedInUser",
      data: username,
    });
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

  useEffect(() => {
    dispatch({
      type: "setMessageList",
      data: initialMessageList,
    });
  }, []);

  return (
    <div>
      <h1>Jitter</h1>

      {/*** Wrap all the components involved in the app's routing */}
      <Router>
        {/*** Navigation isn't a part of routes  */}
        {/*** It is in the brower router because it uses the Link component */}
        <Navigation loggedInUser={loggedInUser} activateUser={activateUser} />
        <Routes>
          <Route path="/" element={<Navigate to="messages" replace />} />
          {/*** Nested Routes  */}
          <Route path="messages">
            <Route index element={<Messages messageList={messageList} />} />
            <Route
              path="new"
              element={
                loggedInUser ? (
                  <MessageForm
                    loggedInUser={loggedInUser}
                    addMessage={addMessage}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path=":messageId"
              element={<MessageDetail messageList={messageList} />}
            />
          </Route>
          <Route path="about" element={<About />} />
          <Route
            path="login"
            element={<LoginForm activateUser={activateUser} />}
          />
          {/*** for everything else routes render NotFound component */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
