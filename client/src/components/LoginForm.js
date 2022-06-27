import React from "react";
import "../styles/loginform.css";

const Login = ({
  username,
  password,
  userOnchange,
  passwordOnchange,
  handlelogin,
}) => {
  return (
    <div className="app">
      <div className="form">
        <div className="title">Sign In</div>

        <form onSubmit={handlelogin}>
          <div className="input-container">
            <label>Username </label>
            <input
              type="text"
              name="uname"
              required
              value={username}
              onChange={userOnchange}
            />
          </div>
          <div className="input-container">
            <label>Password </label>
            <input
              type="password"
              name="pass"
              required
              value={password}
              onChange={passwordOnchange}
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
