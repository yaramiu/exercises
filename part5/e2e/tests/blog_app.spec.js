import { test, expect, beforeEach, describe } from "@playwright/test";
import { loginWith, createBlog } from "./helper.js";

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: {
        username: "mluukkai",
        name: "Matti Luukkainen",
        password: "salainen",
      },
    });

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
          const noDetailsBlogDiv = page
            .getByText(`Code Smells Jeff Atwood`)
            .locator("..");
          await noDetailsBlogDiv.getByRole("button", { name: "view" }).click();

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
      });
    });
  });
});
