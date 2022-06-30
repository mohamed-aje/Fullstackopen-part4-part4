import React, { useState } from "react";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState(null);
  // const [firstName, setFirstname] = useState("");
  // const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  // const [signuppassword, setSignuppassword] = useState("");
  const navigate = useNavigate();

  // const handleSignup = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const user = await signupService.signup({
  //       lastName,
  //       firstName,
  //       email,
  //       password,
  //     });
  //   } catch (error) {
  //     setMessage("wrong ");
  //     setTimeout(() => {
  //       setMessage(null);
  //     }, 5000);
  //   }
  // };
  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("logging in with", email, password);
    try {
      const user = await loginService.login({
        email,
        password,
      });
      blogService.setToken(user.token);
      console.log(user);

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      setUser(user);
      setEmail("");
      setPassword("");
    } catch (exception) {
      setMessage("wrong credentials");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const handleLogout = (e) => {
    console.log("logged out");
    setUser(null);
    window.localStorage.clear();
  };
  return (
    <div className="app">
      <div className="form">
        <div className="title">Sign In</div>

        <form onSubmit={handleLogin}>
          <div className="input-container">
            <label>Username </label>
            <input
              type="text"
              name="uname"
              required
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />
          </div>
          <div className="input-container">
            <label>Password </label>
            <input
              type="password"
              name="pass"
              required
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <div className="button-container">
            <input type="submit" value="Login" />
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
