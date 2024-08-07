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
};

const viewBlogDetails = async (page, blogTitle, blogAuthor) => {
  const noDetailsBlogDiv = page
    .getByText(`${blogTitle} ${blogAuthor}`)
    .locator("..");
  await noDetailsBlogDiv.getByRole("button", { name: "view" }).click();
};

const createUser = async (request, username, name, password) => {
  await request.post("/api/users", {
    data: { username, name, password },
  });
};

export { loginWith, createBlog, viewBlogDetails, createUser };
