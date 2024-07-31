import app from "../app.js";
import supertest from "supertest";
import User from "../models/user.js";
import { describe, test, beforeEach, after } from "node:test";
import assert from "node:assert";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const api = supertest(app);

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("secret", 10);
    const user = new User({ username: "root", passwordHash });
    await user.save();
  });

  describe("creation of users", () => {
    test("returns status code 400 and error message if username is missing", async () => {
      const userWithNoUsername = {
        password: "password",
      };
      const response = await api
        .post("/api/users")
        .send(userWithNoUsername)
        .expect(400);
      assert(response.body.error.includes("missing username"));
    });

    test("returns status code 400 and error message if username is less than 3 characters", async () => {
      const userWithShortUsername = {
        username: "hi",
        password: "password",
      };
      const response = await api
        .post("/api/users")
        .send(userWithShortUsername)
        .expect(400);
      assert(
        response.body.error.includes(
          "username length is less than 3 characters"
        )
      );
    });

    test("returns status code 400 and error message if password is missing", async () => {
      const userWithNoPassword = {
        username: "hellas",
      };
      const response = await api
        .post("/api/users")
        .send(userWithNoPassword)
        .expect(400);
      assert(response.body.error.includes("missing password"));
    });

    test("returns status code 400 and error message if password is less than 3 characters", async () => {
      const userWithShortPassword = {
        username: "hellas",
        password: "hi",
      };
      const response = await api
        .post("/api/users")
        .send(userWithShortPassword)
        .expect(400);
      assert(
        response.body.error.includes(
          "password length is less than 3 characters"
        )
      );
    });

    test("returns status code 400 and error message if username is not unique", async () => {
      const newUser = {
        username: "root",
        password: "secret",
      };
      const response = await api.post("/api/users").send(newUser).expect(400);
      assert(response.body.error.includes("username is not unique"));
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
