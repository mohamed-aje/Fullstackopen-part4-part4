import React, { useState, useEffect } from "react";

import { Container, Navbar, NavDropdown, Nav } from "react-bootstrap";
import useLocalStorage from "../hooks/useLocalStorage";

const nav = ({ sendUser }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useLocalStorage("key", "Value");
  useEffect(() => {
    if (user) {
      sendUser(user);
      setToken(token);
      console.log(token);
    }
  }, [user]);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/blogs">Blogs</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <NavDropdown title="Profile" id="basic-nav-dropdown">
              <NavDropdown.Item href="/login">Login</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default nav;
