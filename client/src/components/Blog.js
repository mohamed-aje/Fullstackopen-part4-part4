import React from "react";
import Togglable from "./Togglable";
const Blog = ({ blog, addLikes, deleteHandler }) => {
  if (!blog.id) return null;
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
    display: "flex",
  };
  return (
    <div style={blogStyle}>
      <div>
        <div className="blogTitle">{blog.title}</div>
        <Togglable name="hide" buttonLabel="view">
          {" "}
          Author:
          {blog.author}
          <br />
          Url:{blog.url} <br />
          Likes:{blog.likes}
          <button onClick={addLikes}>like</button>
        </Togglable>
        <button onClick={deleteHandler}>Delete</button>
      </div>
    </div>
  );
};

export default Blog;
