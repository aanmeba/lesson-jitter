import React, { useEffect, useState } from "react";
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

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [messageList, setMessageList] = useState([]);

  const activateUser = (username) => {
    setLoggedInUser(username);
  };

  const addMessage = (text) => {
    const message = {
      text: text,
      user: loggedInUser,
      // id: nextId(messageList),
      id: messageList[0].id + 1,
    };
    setMessageList((messageList) => [message, ...messageList]);
  };

  // function nextId(data) {
  //   // first exclude the empty data case
  //   if (data.length === 0) return 1;

  //   // second handle if data is not empty
  //   const sortData = data.sort((a, b) => a.id - b.id);
  //   const nextId = sortData[sortData.length - 1].id + 1;

  //   return nextId;
  // }

  useEffect(() => {
    setMessageList(initialMessageList);

    // fetch need later
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
