import React, { useState, useEffect, useHistory } from "react";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import loginService from "./services/login";
import signupService from "./services/signup";
import { Routes, Route, Navigate } from "react-router-dom";
import UserBlog from "./components/UserBlog";

import Notification from "./components/Notification";
import Navbar from "./components/Navbar";
import About from "./components/About";
import SignupForm from "./components/SignupForm";

const App = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [signuppassword, setSignuppassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const user = await signupService.signup({
        lastName,
        firstName,
        email,
        password,
      });
    } catch (error) {
      setMessage("wrong ");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };
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
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

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
          path="blogs"
          element={
            <UserBlog user={user} setUser={setUser} setMessage={setMessage} />
          }
        />
        <Route
          exact
          path="/home"
          element={
            user ? (
              <Navigate to="blogs" replace={true} />
            ) : (
              <Navigate to="login" />
            )
          }
        />
        <Route path="about" element={<About />} />
        <Route
          path="signup"
          element={
            <SignupForm
              handlelogin={handleSignup}
              firstname={firstName}
              lastname={lastName}
              email={email}
              signuppassword={signuppassword}
              passwordOnchange={(target) => setSignuppassword(target.value)}
              firstnameOnchange={({ target }) => setFirstname(target.value)}
              lastnameOnchange={({ target }) => setLastname(target.value)}
              emailOnchange={({ target }) => setEmail(target.value)}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
