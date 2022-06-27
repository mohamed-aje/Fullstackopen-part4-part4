import React from "react";
import { Link } from "react-router-dom";
import "../styles/loginform.css";

const SignupForm = ({
  firstnameOnchange,
  signuppassword,
  firstname,
  lastname,
  passwordOnchange,
  handlelogin,
  lastnameOnchange,
  email,
  emailOnchange,
}) => {
  return (
    <form onSubmit={handlelogin}>
      <div className="input-container">
        <label>First Name </label>
        <input
          type="text"
          name="first name"
          required
          value={firstname}
          onChange={firstnameOnchange}
        />
      </div>
      <div className="input-container">
        <label>last Name </label>
        <input
          type="text"
          name="lastname"
          required
          value={lastname}
          onChange={lastnameOnchange}
        />
      </div>
      <div className="input-container">
        <label>email </label>
        <input
          type="text"
          name="email"
          required
          value={email}
          onChange={emailOnchange}
        />
      </div>
      <div className="input-container">
        <label>Password </label>
        <input
          type="password"
          name="password"
          required
          value={signuppassword}
          onChange={passwordOnchange}
        />
      </div>
      <div className="button-container">
        <input type="submit" value="Signup" />
      </div>
      <p className="forgot-password text-right">
        Already registered <a href="/login">sign in?</a>
      </p>
    </form>
  );
};
export default SignupForm;
