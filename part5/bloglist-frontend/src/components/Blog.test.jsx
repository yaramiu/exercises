import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import { describe, expect, test, vi } from "vitest";
import userEvent from "@testing-library/user-event";

describe("<Blog />", () => {
  const currentUser = { username: "root", name: "Superuser", id: "123" };
  const blog = {
    title: "Code Smells",
    author: "Jeff Atwood",
    url: "https://blog.codinghorror.com/code-smells/",
    likes: 0,
    user: currentUser,
  };

  test("displays blog title and author, but not url and number of likes by default", async () => {
    render(<Blog blog={blog} />);

    const blogTitle = screen.getByText("Code Smells", { exact: false });
    const blogAuthor = screen.getByText("Jeff Atwood", { exact: false });
    expect(blogTitle).toBeDefined();
    expect(blogAuthor).toBeDefined();

    const blogUrl = screen.queryByText(
      "https://blog.codinghorror.com/code-smells/"
    );
    const blogLikes = screen.queryByText("likes 0");
    expect(blogUrl).toBeNull();
    expect(blogLikes).toBeNull();
  });

  test("displays blog url and number of likes when show details button is clicked", async () => {
    render(<Blog blog={blog} currentlyViewingUser={currentUser} />);

    const user = userEvent.setup();
    const showDetailsButton = screen.getByText("view");
    await user.click(showDetailsButton);

    const blogUrl = screen.getByText(
      "https://blog.codinghorror.com/code-smells/",
      { exact: false }
    );
    const blogLikes = screen.getByText("likes 0", { exact: false });
    expect(blogUrl).toBeDefined();
    expect(blogLikes).toBeDefined();
  });

  test("calls addLikes twice when the like button is clicked twice", async () => {
    const addLikes = vi.fn();

    render(
      <Blog
        blog={blog}
        addLikes={addLikes}
        currentlyViewingUser={currentUser}
      />
    );

    const user = userEvent.setup();
    const showDetailsButton = screen.getByText("view");
    await user.click(showDetailsButton);

    const likeButton = screen.getByText("like");
    await user.click(likeButton);
    await user.click(likeButton);
    expect(addLikes.mock.calls).toHaveLength(2);
  });
});
