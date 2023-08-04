const helper = require("./test_helper");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect("Content-Type", /application\/json/)
    .expect(200);
});

test("blog posts contains id property", () => {
  expect(new Blog().id).toBeDefined();
});

test("a blog post can be added", async () => {
  const newBlogPost = {
    title: "npm audit: Broken by Design",
    author: "Dan Abramov",
    url: "https://overreacted.io/npm-audit-broken-by-design/",
    likes: 10,
  };

  const blogPostsBefore = await helper.getBlogPostsFromDatabase();

  await api.post("/api/blogs").send(newBlogPost).expect(201);

  const blogPostsAfter = await helper.getBlogPostsFromDatabase();

  expect(blogPostsAfter).toHaveLength(blogPostsBefore.length + 1);

  const titles = blogPostsAfter.map((blogPost) => blogPost.title);
  expect(titles).toContain("npm audit: Broken by Design");
});

test("blog missing the likes property defaults to a value of 0", async () => {
  const newBlogPost = {
    title: "On let vs const",
    author: "Dan Abramov",
    url: "https://overreacted.io/on-let-vs-const/",
  };

  expect(newBlogPost.likes).toBeUndefined();

  const response = await api.post("/api/blogs").expect(201);

  const blogPost = response.body;
  expect(blogPost.likes).toBe(0);
});

afterAll(async () => {
  await mongoose.connection.close();
});
