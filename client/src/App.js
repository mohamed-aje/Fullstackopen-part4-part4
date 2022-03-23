import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import blogService from "./Services/blogs";
import loginService from "./Services/login";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

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
  const handleLogout = (e) => {
    console.log("logged out");
    setUser(null);
    window.localStorage.clear();
  };
  const addBlog = (e) => {
    e.preventDefault();
    console.log("title:", title, "author:", author, "url:", url);
    const blogObject = {
      title: title,
      author: author,
      url: url,
    };
    blogService.create(blogObject).then((returnedObject) => {
      setBlogs(blogs.concat(returnedObject));

      setTitle("");
      setAuthor("");
      setUrl("");
      setMessage(`a new Blog${title} by ${user.name} `);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    });

    console.log("a new Blog", title, "by", user.name);
  };

  const loginForm = () => (
    <LoginForm
      userOnchange={({ target }) => setUsername(target.value)}
      passwordOnchange={({ target }) => setPassword(target.value)}
      username={username}
      password={password}
      handlelogin={handleLogin}
    />
  );
  const blogForm = () => blogs.map((blog) => <Blog blog={blog} />);

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={message} />

      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>
            {user.name} logged-in{" "}
            <button
              onClick={(e) => {
                handleLogout();
              }}
            >
              logout
            </button>
            <BlogForm
              handleblog={addBlog}
              title={title}
              author={author}
              url={url}
              titleChange={({ target }) => setTitle(target.value)}
              urlChange={({ target }) => setUrl(target.value)}
              authorChange={({ target }) => setAuthor(target.value)}
            />
          </p>
          {blogForm()}
        </div>
      )}
    </div>
  );
};

export default App;
