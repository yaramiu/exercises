import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import "./index.css";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const blogFormRef = useRef();

  useEffect(() => {
    const getBlogsFromServer = async () => {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    };

    getBlogsFromServer();
  }, []);

  useEffect(() => {
    const setupLoggedInUser = async () => {
      const loggedInUserJSON = window.localStorage.getItem("loggedInUser");
      if (loggedInUserJSON) {
        setUser(JSON.parse(loggedInUserJSON));
      }
    };

    setupLoggedInUser();
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const loggedInUser = await loginService.login({ username, password });
      window.localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
      setUser(loggedInUser);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("wrong username or password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = async () => {
    window.localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  const addBlog = async (blog) => {
    blogService.setToken(user.token);
    try {
      const createdBlog = await blogService.create(blog);
      blogFormRef.current.toggleVisibility();
      setBlogs(blogs.concat(createdBlog));
      setSuccessMessage(
        `a new blog ${createdBlog.title} by ${createdBlog.author} added`
      );
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (exception) {
      console.error(exception);
    }
  };

  const addLikes = async (blogToUpdate) => {
    blogService.setToken(user.token);
    const blogRequestData = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1,
      user: blogToUpdate.user.id,
    };
    try {
      let updatedBlog = await blogService.update(blogRequestData);
      updatedBlog = { ...updatedBlog, user: blogToUpdate.user };
      setBlogs(
        blogs.map((blog) => (blog.id === blogToUpdate.id ? updatedBlog : blog))
      );
    } catch (exception) {
      console.error(exception);
    }
  };

  const removeBlog = async (blogToRemove) => {
    if (
      window.confirm(
        `Remove blog ${blogToRemove.title} by ${blogToRemove.author}`
      )
    ) {
      blogService.setToken(user.token);
      try {
        await blogService.remove(blogToRemove.id);
        setBlogs(blogs.filter((blog) => blog.id != blogToRemove.id));
      } catch (exception) {
        console.error(exception);
      }
    }
  };

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification type={"error"} message={errorMessage} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              data-testid="username"
              type="text"
              name="username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              data-testid="password"
              type="password"
              name="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification type={"success"} message={successMessage} />
      <div>
        <p>
          {user.name} logged in
          <button type="button" onClick={handleLogout}>
            logout
          </button>
        </p>
      </div>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <h2>create new</h2>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            addLikes={addLikes}
            currentlyViewingUser={user}
            remove={removeBlog}
          />
        ))}
    </div>
  );
};

export default App;
