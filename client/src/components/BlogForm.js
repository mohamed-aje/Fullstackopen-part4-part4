import React from "react";
import { Button, Form } from "react-bootstrap";
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
    <div>
      <div>
        <h2>Create New Blog</h2>
      </div>
      <Form onSubmit={handleblog}>
        <Form.Group className="mb-3">
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title"
            value={title}
            onChange={titleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            placeholder="Author Name"
            value={author}
            onChange={authorChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Url:</Form.Label>
          <Form.Control
            type="text"
            placeholder="url"
            value={url}
            onChange={urlChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create
        </Button>
      </Form>
    </div>
  );
};
export default BlogForm;
