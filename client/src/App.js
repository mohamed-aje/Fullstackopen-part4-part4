import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/Navbar";
import UserBlog from "./components/UserBlog";
import About from "./components/About";
import LoginForm from "./components/LoginForm";
const App = () => {
  const [user, setUser] = useState();

  return (
    <div>
      <Router>
        <Nav sendUser={setUser} />
        <div>
          <Routes>
            <Route path="/about" exact element={<About />}></Route>
            <Route path="/login" exact element={<LoginForm />}></Route>
            <Route
              path="/blogs"
              exact
              element={<UserBlog user={user} />}
            ></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
};
export default App;
