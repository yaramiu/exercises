import app from "../app.js";
import supertest from "supertest";
import { test, after, beforeEach, describe } from "node:test";
import assert from "node:assert";
import testHelper from "./test_helper.js";
import Blog from "../models/blog.js";
import mongoose from "mongoose";
import User from "../models/user.js";

const api = supertest(app);

describe("when there is initially some blogs", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(testHelper.initialBlogs);
    await User.deleteMany({});
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

  test("blogs from db have id property", async () => {
    const blogs = await testHelper.blogsInDb();
    for (let blog of blogs) {
      assert.notStrictEqual(blog.id, undefined);
    }
  });

  describe("addition of a new blog", async () => {
    test("succeeds with valid data and token", async () => {
      const token = await testHelper.getTokenFromNewUser();

      const response = await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(testHelper.newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);
      const returnedBlog = response.body;

      const blogsAtEnd = await testHelper.blogsInDb();
      assert.strictEqual(blogsAtEnd.length, testHelper.initialBlogs.length + 1);

      const createdBlog = await Blog.findById(returnedBlog.id);
      assert.notStrictEqual(createdBlog, undefined);
    });

    test("sets likes to 0 by default", async () => {
      const blogWithoutLikes = {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      };
      const token = await testHelper.getTokenFromNewUser();

      const response = await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(blogWithoutLikes)
        .expect(201)
        .expect("Content-Type", /application\/json/);
      const returnedBlog = response.body;

      const createdBlog = await Blog.findById(returnedBlog.id);
      assert.strictEqual(createdBlog.likes, 0);
    });

    test("returns status code 400 if no title", async () => {
      const blogWithoutTitle = {
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
      };
      const token = await testHelper.getTokenFromNewUser();

      const response = await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(blogWithoutTitle)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      assert.deepStrictEqual(response.body, { error: "missing title" });
    });

    test("returns status code 400 if no url", async () => {
      const blogWithoutUrl = {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        likes: 0,
      };
      const token = await testHelper.getTokenFromNewUser();

      const response = await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(blogWithoutUrl)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      assert.deepStrictEqual(response.body, { error: "missing url" });
    });

    test("returns status code 401 if token is missing or invalid", async () => {
      let response = await api
        .post("/api/blogs")
        .send(testHelper.newBlog)
        .expect(401)
        .expect("Content-Type", /application\/json/);
      assert.deepStrictEqual(response.body, { error: "invalid token" });

      response = await api
        .post("/api/blogs")
        .set("Authorization", `Bearer 123456`)
        .send(testHelper.newBlog)
        .expect(401)
        .expect("Content-Type", /application\/json/);
      assert.deepStrictEqual(response.body, { error: "invalid token" });
    });
  });

  describe("deletion of a blog", () => {
    test("succeeds if blog is in db and token is valid", async () => {
      const token = await testHelper.getTokenFromNewUser();

      const response = await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(testHelper.newBlog);
      const createdBlog = response.body;

      const blogsBeforeDeletion = await testHelper.blogsInDb();
      await api
        .delete(`/api/blogs/${createdBlog.id}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(204);
      const blogsAfterDeletion = await testHelper.blogsInDb();

      assert.strictEqual(
        blogsAfterDeletion.length,
        blogsBeforeDeletion.length - 1
      );
    });

    test("returns status code 404 if blog does not exist", async () => {
      const validNonExistentId = await testHelper.nonExistentId();
      const token = await testHelper.getTokenFromNewUser();
      await api
        .delete(`/api/blogs/${validNonExistentId}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(404);
    });

    test("returns status code 400 if blog id is invalid", async () => {
      const invalidId = "invalidId";
      const token = await testHelper.getTokenFromNewUser();

      const response = await api
        .delete(`/api/blogs/${invalidId}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      assert.deepStrictEqual(response.body, { error: "malformatted id" });
    });

    test("returns status code 401 if token is missing or invalid", async () => {
      const token = await testHelper.getTokenFromNewUser();

      let response = await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(testHelper.newBlog);
      const createdBlog = response.body;

      response = await api
        .delete(`/api/blogs/${createdBlog.id}`)
        .expect(401)
        .expect("Content-Type", /application\/json/);
      assert.deepStrictEqual(response.body, { error: "invalid token" });

      response = await api
        .delete(`/api/blogs/${createdBlog.id}`)
        .set("Authorization", `Bearer abc123`)
        .expect(401)
        .expect("Content-Type", /application\/json/);
      assert.deepStrictEqual(response.body, { error: "invalid token" });
    });

    test("returns status code 401 if token is not from the same user who created the blog", async () => {
      const token = await testHelper.getTokenFromNewUser();

      let response = await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(testHelper.newBlog);
      const createdBlog = response.body;

      await User.deleteMany({});

      const tokenFromDifferentUser = await testHelper.getTokenFromNewUser();

      response = await api
        .delete(`/api/blogs/${createdBlog.id}`)
        .set("Authorization", `Bearer ${tokenFromDifferentUser}`)
        .expect(401)
        .expect("Content-Type", /application\/json/);

      assert.deepStrictEqual(response.body, { error: "invalid user" });
    });
  });

  describe("updating a blog", () => {
    test("succeeds if blog is in db", async () => {
      const blogsAtStart = await testHelper.blogsInDb();
      const firstBlog = blogsAtStart[0];

      const response = await api
        .put(`/api/blogs/${firstBlog.id}`)
        .send(testHelper.blogWithMoreLikes)
        .expect(200)
        .expect("Content-Type", /application\/json/);
      const updatedBlog = response.body;

      assert.strictEqual(updatedBlog.likes, 10);
    });

    test("returns status code 404 if blog does not exist", async () => {
      const validNonExistentId = await testHelper.nonExistentId();
      await api
        .put(`/api/blogs/${validNonExistentId}`)
        .send(testHelper.blogWithMoreLikes)
        .expect(404);
    });

    test("returns status code 400 if blog id is invalid", async () => {
      const invalidId = "invalidId";
      await api
        .put(`/api/blogs/${invalidId}`)
        .send(testHelper.blogWithMoreLikes)
        .expect(400);
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
