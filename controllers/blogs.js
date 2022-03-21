const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const middleware = require("../utils/middleware");
const { request, response } = require("../app");

blogsRouter.get("/api/blogs", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});
blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

blogsRouter.post("/", middleware.userExtractor, async (request, response) => {
  const body = request.body;
  const token = request.token;
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const user = request.user;
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });
  try {
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.json(savedBlog);
  } catch (error) {
    response.status(400).json(error);
  }
});
blogsRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    const blog = await Blog.findById(request.params.id);
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    const token = request.token;
    const user = request.user;
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    }
    if (blog) {
      if (blog.user.toString() === user.id.toString()) {
        await Blog.findByIdAndRemove(request.params.id);
        response.status(204).end();
      } else {
        return response.status(401).json({ error: "wrong autorization" });
      }
    } else {
      return response.status(401).json({ error: "not existing id" });
    }
  }
);

module.exports = blogsRouter;
