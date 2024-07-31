import app from "../app.js";
import supertest from "supertest";
import { test, after, beforeEach, describe } from "node:test";
import assert from "node:assert";
import testHelper from "./test_helper.js";
import Blog from "../models/blog.js";
import mongoose from "mongoose";

const api = supertest(app);

describe("when there is initially some blogs", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(testHelper.initialBlogs);
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

  describe("addition of a new blog", async () => {
    test("succeeds with valid data", async () => {
      const newBlog = {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
      };

      await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const blogsAtEnd = await testHelper.blogsInDB();
      assert.strictEqual(blogsAtEnd.length, testHelper.initialBlogs.length + 1);

      const createdBlog = await Blog.findOne(newBlog);
      assert.notStrictEqual(createdBlog, undefined);
    });

    test("sets likes to 0 by default", async () => {
      const blogWithoutLikes = {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      };

      await api
        .post("/api/blogs")
        .send(blogWithoutLikes)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const createdBlog = await Blog.findOne(blogWithoutLikes);
      assert.strictEqual(createdBlog.likes, 0);
    });

    test("returns status code 400 if no title", async () => {
      const blogWithoutTitle = {
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
      };

      const response = await api
        .post("/api/blogs")
        .send(blogWithoutTitle)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      assert.deepStrictEqual(response.body, { error: "Missing title" });
    });

    test("returns status code 400 if no url", async () => {
      const blogWithoutUrl = {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        likes: 0,
      };

      const response = await api
        .post("/api/blogs")
        .send(blogWithoutUrl)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      assert.deepStrictEqual(response.body, { error: "Missing url" });
    });
  });

  describe("deletion of a blog", () => {
    test("succeeds if id is in DB", async () => {
      const blogsAtStart = await testHelper.blogsInDB();
      const firstBlog = blogsAtStart[0];

      await api.delete(`/api/blogs/${firstBlog.id}`).expect(204);

      const blogsAtEnd = await testHelper.blogsInDB();

      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1);

      const nonExistentBlog = await Blog.findOne(firstBlog);
      assert.strictEqual(nonExistentBlog, null);
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
