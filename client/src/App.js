import React, { useState } from "react";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import loginService from "./services/login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import UserBlog from "./components/UserBlog";

import Notification from "./components/Notification";
import Navbar from "./components/Navbar";

const App = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("logging in with", username, password);
    try {
      const user = await loginService.login({
        username,
        password,
      });
      blogService.setToken(user.token);

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setMessage("wrong credentials");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
    console.log("user", user);
  };
  return (
    <div>
      <Navbar />
      <Notification message={message} />
      <Routes>
        <Route path="/" element={<p>hello</p>} />

        <Route
          path="/login"
          element={
            <LoginForm
              userOnchange={({ target }) => setUsername(target.value)}
              passwordOnchange={({ target }) => setPassword(target.value)}
              username={username}
              password={password}
              handlelogin={handleLogin}
            />
          }
        />
        <Route
          path="/blogs"
          element={
            user ? (
              <UserBlog user={user} setUser={setUser} setMessage={setMessage} />
            ) : (
              <LoginForm
                userOnchange={({ target }) => setUsername(target.value)}
                passwordOnchange={({ target }) => setPassword(target.value)}
                username={username}
                password={password}
                handlelogin={handleLogin}
              />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;
