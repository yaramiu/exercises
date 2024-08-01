import express from "express";
import Blog from "../models/blog.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

const blogsRouter = express.Router();

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const { url, title, author, likes } = request.body;

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }

  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    url,
    title,
    author,
    user: user.id,
    likes,
  });

  if (blog.title === undefined) {
    response.status(400).json({ error: "Missing title" });
  } else if (blog.url === undefined) {
    response.status(400).json({ error: "Missing url" });
  }

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const blogId = request.params.id;
  await Blog.deleteOne({ id: blogId });
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: Number(body.likes),
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  if (updatedBlog) {
    response.status(200).json(updatedBlog);
  } else {
    response.status(404).end();
  }
});

export default blogsRouter;
