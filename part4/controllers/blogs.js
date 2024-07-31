import express from "express";
import Blog from "../models/blog.js";

const blogsRouter = express.Router();

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post("/", async (request, response, next) => {
  const blog = new Blog(request.body);

  try {
    const result = await blog.save();
    response.status(201).json(result);
  } catch (exception) {
    if (blog.title === undefined) {
      response.status(400).json({ error: "Missing title" });
    } else if (blog.url === undefined) {
      response.status(400).json({ error: "Missing url" });
    }
    next(exception);
  }
});

blogsRouter.delete("/:id", async (request, response) => {
  const blogId = request.params.id;
  await Blog.deleteOne({ id: blogId });
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response, next) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: Number(body.likes),
  };

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
    });
    if (updatedBlog) {
      response.status(200).json(updatedBlog);
    } else {
      response.status(404).end();
    }
  } catch (exception) {
    next(exception);
  }
});

export default blogsRouter;
