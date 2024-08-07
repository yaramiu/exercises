import { test, expect, beforeEach, describe } from "@playwright/test";
import {
  loginWith,
  createBlog,
  viewBlogDetails,
  createUser,
  likeBlog,
} from "./helper.js";

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await createUser(request, "mluukkai", "Matti Luukkainen", "salainen");
    await createUser(request, "hellas", "Arto Hellas", "salainen");

    await page.goto("/");
  });

  test("Login form is shown", async ({ page }) => {
    await expect(page.getByText("log in to application")).toBeVisible();
  });

  describe("Login", () => {
    test("succeed with correct credentials", async ({ page }) => {
      await loginWith(page, "mluukkai", "salainen");
      await expect(page.getByText("Matti Luukkainen logged in")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await loginWith(page, "mluukkai", "wrong");
      await expect(
        page.getByText("Matti Luukkainen logged in")
      ).not.toBeVisible();

      const errorDiv = page.locator(".error");
      await expect(errorDiv).toContainText("wrong username or password");
      await expect(errorDiv).toHaveCSS("border-style", "solid");
      await expect(errorDiv).toHaveCSS("color", "rgb(255, 0, 0)");
    });

    describe("When logged in", () => {
      beforeEach(async ({ page }) => {
        await loginWith(page, "mluukkai", "salainen");
      });

      test("a new blog can be created", async ({ page }) => {
        await createBlog(
          page,
          "The Cloud Is Just Someone Else's Computer",
          "Jeff Atwood",
          "https://blog.codinghorror.com/the-cloud-is-just-someone-elses-computer/"
        );
        await expect(
          page.getByText(
            "The Cloud Is Just Someone Else's Computer Jeff Atwood"
          )
        ).toBeVisible();
      });

      describe("and multiple blogs exists", () => {
        beforeEach(async ({ page }) => {
          await createBlog(
            page,
            "The Cloud Is Just Someone Else's Computer",
            "Jeff Atwood",
            "https://blog.codinghorror.com/the-cloud-is-just-someone-elses-computer/"
          );
          await createBlog(
            page,
            "Code Smells",
            "Jeff Atwood",
            "https://blog.codinghorror.com/code-smells/"
          );
        });

        test("liking a blog increases its likes", async ({ page }) => {
          await viewBlogDetails(page, "Code Smells", "Jeff Atwood");

          const likesBefore = await page
            .getByTestId("current-likes")
            .textContent();

          const responsePromise = page.waitForResponse(
            (response) => response.status() === 200
          );
          await page.getByRole("button", { name: "like" }).click();
          await responsePromise;

          const likesAfter = await page
            .getByTestId("current-likes")
            .textContent();

          expect(Number(likesAfter)).toStrictEqual(Number(likesBefore) + 1);
        });

        test("user who added the blog can delete the blog", async ({
          page,
        }) => {
          await viewBlogDetails(page, "Code Smells", "Jeff Atwood");
          page.on("dialog", (dialog) => dialog.accept());
          await page.getByRole("button", { name: "remove" }).click();
          await expect(
            page.getByText("Code Smells Jeff Atwood")
          ).not.toBeVisible();
        });

        test("user who didn't add the blog can't see the blog's remove button", async ({
          page,
        }) => {
          await page.evaluate(() => window.localStorage.clear());
          await page.reload();

          await loginWith(page, "hellas", "salainen");

          await viewBlogDetails(page, "Code Smells", "Jeff Atwood");
          expect(
            page.getByRole("button", { name: "remove" })
          ).not.toBeVisible();
        });

        test("blogs are arranged in order of likes", async ({ page }) => {
          let blogDivs = await page.getByTestId("blog").all();
          await expect(blogDivs[0]).toContainText(
            "The Cloud Is Just Someone Else's Computer Jeff Atwood"
          );
          await expect(blogDivs[1]).toContainText("Code Smells Jeff Atwood");

          await likeBlog(page, "Code Smells", "Jeff Atwood");

          blogDivs = await page.getByTestId("blog").all();
          await expect(blogDivs[0]).toContainText("Code Smells Jeff Atwood");
          await expect(blogDivs[1]).toContainText(
            "The Cloud Is Just Someone Else's Computer Jeff Atwood"
          );
        });
      });
    });
  });
});
