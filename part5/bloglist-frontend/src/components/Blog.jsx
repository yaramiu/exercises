import { useState } from "react";

const Blog = ({ blog, addLikes, currentlyViewingUser, remove }) => {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const removeButtonStyle = {
    backgroundColor: "#2d7af4",
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}{" "}
        <button onClick={() => setIsDetailsVisible(!isDetailsVisible)}>
          {isDetailsVisible ? "hide" : "view"}
        </button>
      </div>
      {isDetailsVisible ? (
        <div>
          <div>
            {blog.url} <br />
            likes <span data-testid="current-likes">{blog.likes}</span>
            <button onClick={() => addLikes(blog)}>like</button> <br />
            {blog.user.name}
          </div>
          <div>
            {blog.user.name === currentlyViewingUser.name ? (
              <button style={removeButtonStyle} onClick={() => remove(blog)}>
                remove
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Blog;
