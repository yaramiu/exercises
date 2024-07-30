import app from "../app.js";
import supertest from "supertest";
import { test, after, beforeEach } from "node:test";
import assert from "node:assert";
import testHelper from "./test_helper.js";
import Blog from "../models/blog.js";
import mongoose from "mongoose";

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of testHelper.initialBlogs) {
    const blogObject = new Blog(blog);
    await blogObject.save();
  }
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");
  assert.strictEqual(response.body.length, testHelper.initialBlogs.length);
});

test("blogs from DB have id property", async () => {
  const blogs = await testHelper.blogsInDB();
  for (let blog of blogs) {
    assert.notStrictEqual(blog.id, undefined);
  }
});

after(async () => {
  await mongoose.connection.close();
});
