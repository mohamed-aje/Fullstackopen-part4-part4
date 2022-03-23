import React from "react";
const BlogForm = ({
  handleblog,
  title,
  author,
  url,
  titleChange,
  authorChange,
  urlChange,
}) => {
  return (
    <>
      <div>
        <h2>Create New Blog</h2>
      </div>
      <form onSubmit={handleblog}>
        <div>
          Title:{" "}
          <input
            type="text"
            value={title}
            name="title"
            onChange={titleChange}
          />
        </div>
        <div>
          Author:{" "}
          <input
            type="text"
            name="author"
            value={author}
            onChange={authorChange}
          />
        </div>
        <div>
          Url: <input type="text" name="url" value={url} onChange={urlChange} />
        </div>
        <button type="submit">Create</button>
      </form>
    </>
  );
};
export default BlogForm;
