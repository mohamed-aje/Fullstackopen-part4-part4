import React from "react";
import "../index";
import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";

const Navbar = () => {
  return (
    <nav>
      <ul className="nav-links">
        <li>
          {" "}
          <h2>Blogs</h2>
        </li>
        <li>About</li>
        <li>Blogs</li>
        search:
        <input />
        <Link to="/login">
          <button type="button">Login</button>
        </Link>{" "}
        <button>Sign up</button>
      </ul>
    </nav>
  );
};
export default Navbar;
