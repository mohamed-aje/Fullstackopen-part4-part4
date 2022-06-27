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
        <li>Blogs</li>
        search:
        <input />
        <Link to="/login">
          <button type="button">Login</button>
        </Link>{" "}
        <Link to="/signup">
          {" "}
          <button>Sign up</button>
        </Link>
      </ul>
    </nav>
  );
};
export default Navbar;
