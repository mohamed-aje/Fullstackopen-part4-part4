import React, { useEffect } from "react";
import "../index";
import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import Togglable from "./Togglable";
import useLocalStorage from "../hooks/useLocalStorage";
const Navbar = () => {
  let user = false;
  useEffect(() => {}, []);
  useLocalStorage("loggedBlogAppUser", ["token"]);
  return (
    <nav>
      <ul className="nav-links">
        <li>
          {" "}
          <Link style={{ textDecoration: "none" }} to="/blogs">
            {" "}
            <li>
              <h2>Blogs</h2>
            </li>
          </Link>
        </li>
        <Link to="/about">
          {" "}
          <li>About</li>
        </Link>
        <li>Info</li>
        {user ? (
          <button>logout</button>
        ) : (
          <Link style={{ textDecoration: "none", color: "beige" }} to="/login">
            login
          </Link>
        )}{" "}
        <Link to="/signup">
          {" "}
          <button>Sign up</button>
        </Link>
      </ul>
    </nav>
  );
};
export default Navbar;
