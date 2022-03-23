import React from "react";

const Login = ({
  username,
  password,
  userOnchange,
  passwordOnchange,
  handlelogin,
}) => {
  return (
    <div>
      <form onSubmit={handlelogin}>
        <div>
          <input
            type="text"
            placeholder="username"
            value={username}
            name="Username"
            onChange={userOnchange}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="password"
            value={password}
            name="Username"
            onChange={passwordOnchange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
export default Login;
