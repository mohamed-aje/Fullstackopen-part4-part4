import React, { useState, useEffect } from "react";
import blogService from "../services/blogs";
import Togglable from "./Togglable";
import Blog from "./Blog";
import BlogForm from "./BlogForm";

const UserBlog = ({ user, setUser, setMessage }) => {
  if (!user) return null;
  const handleLogout = (e) => {
    console.log("logged out");
    setUser(null);
    window.localStorage.clear();
  };
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const deleteHandler = (id) => {
    const blog = blogs.find((b) => b.title);

    const confirmed = window.confirm(`remove ${blog.title}`);
    if (confirmed) {
      blogService.remove(id).then((response) => {
        setBlogs(blogs.map((blog) => (blog.id !== id ? blog : response)));
      });

      setMessage(`remove ${blog.title} by${user.name} `);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const addLikes = (id) => {
    const blog = blogs.find((b) => b.id === id);
    const updatedBlog = { ...blog, likes: blog.likes + 1 };

    blogService
      .update(id, updatedBlog)
      .then((returnedBlog) => {
        setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)));
      })
      .catch((error) => {
        setMessage("Something went wrong");
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
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
  };

  const blogForm = () =>
    blogs
      .sort((a, b) => b.likes - a.likes)
      .map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          addLikes={(id) => addLikes(blog.id)}
          deleteHandler={(id) => deleteHandler(blog.id)}
        />
      ));

  return (
    <div className="container">
      <p>{user.name} logged-in </p>
      <button
        onClick={(e) => {
          handleLogout();
        }}
      >
        logout
      </button>
      <Togglable buttonLabel="new blog" name="cancel">
        <BlogForm
          handleblog={addBlog}
          title={title}
          author={author}
          url={url}
          titleChange={({ target }) => setTitle(target.value)}
          urlChange={({ target }) => setUrl(target.value)}
          authorChange={({ target }) => setAuthor(target.value)}
        />
      </Togglable>
      {blogForm()}
    </div>
  );
};
export default UserBlog;
