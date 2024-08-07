const loginWith = async (page, username, password) => {
  await page.getByTestId("username").fill(username);
  await page.getByTestId("password").fill(password);
  await page.getByRole("button", { name: "login" }).click();
};

const createBlog = async (page, title, author, url) => {
  await page.getByRole("button", { name: "create new blog" }).click();
  await page.getByPlaceholder("blog title").fill(title);
  await page.getByPlaceholder("blog author").fill(author);
  await page.getByPlaceholder("blog url").fill(url);
  await page.getByRole("button", { name: "create" }).click();
  await page.getByText(`${title} ${author}`).waitFor();
};

const viewBlogDetails = async (page, title, author) => {
  const noDetailsBlogDiv = page.getByText(`${title} ${author}`).locator("..");
  await noDetailsBlogDiv.getByRole("button", { name: "view" }).click();
};

const createUser = async (request, username, name, password) => {
  await request.post("/api/users", {
    data: { username, name, password },
  });
};

const likeBlog = async (page, title, author) => {
  await viewBlogDetails(page, title, author);
  const responsePromise = page.waitForResponse(
    (response) => response.status() === 200
  );
  await page.getByRole("button", { name: "like" }).click();
  await responsePromise;
};

export { loginWith, createBlog, viewBlogDetails, createUser, likeBlog };
