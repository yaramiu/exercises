import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

describe("<BlogForm />", () => {
  test("calls addBlog with the right details", async () => {
    const addBlog = vi.fn();

    render(<BlogForm createBlog={addBlog} />);

    const user = userEvent.setup();
    const titleInput = screen.getByPlaceholderText("blog title");
    await user.type(titleInput, "The Cloud is Just Someone Else's Computer");
    const authorInput = screen.getByPlaceholderText("blog author");
    await user.type(authorInput, "Jeff Atwood");
    const urlInput = screen.getByPlaceholderText("blog url");
    await user.type(
      urlInput,
      "https://blog.codinghorror.com/the-cloud-is-just-someone-elses-computer/"
    );

    const createBlogButton = screen.getByText("create");
    await user.click(createBlogButton);

    expect(addBlog.mock.calls).toHaveLength(1);

    expect(addBlog.mock.calls[0][0].title).toBe(
      "The Cloud is Just Someone Else's Computer"
    );
    expect(addBlog.mock.calls[0][0].author).toBe("Jeff Atwood");
    expect(addBlog.mock.calls[0][0].url).toBe(
      "https://blog.codinghorror.com/the-cloud-is-just-someone-elses-computer/"
    );
  });
});
