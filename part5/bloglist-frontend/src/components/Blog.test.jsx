import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import { describe, expect, test } from "vitest";

describe("<Blog />", () => {
  test("displays blog title and author, but not url and number of likes by default", async () => {
    const blog = {
      title: "Code Smells",
      author: "Jeff Atwood",
      url: "https://blog.codinghorror.com/code-smells/",
      likes: 0,
    };

    render(<Blog blog={blog} />);

    const blogTitle = screen.getByText("Code Smells", { exact: false });
    const blogAuthor = screen.getByText("Jeff Atwood", { exact: false });
    expect(blogTitle).toBeDefined();
    expect(blogAuthor).toBeDefined();

    const blogUrl = screen.queryByText(
      "https://blog.codinghorror.com/code-smells/"
    );
    const blogLikes = screen.queryByText("0");
    expect(blogUrl).toBeNull();
    expect(blogLikes).toBeNull();
  });
});
