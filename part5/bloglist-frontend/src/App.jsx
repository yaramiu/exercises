import { useState, useEffect, useRef, useContext } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import "./index.css";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import NotificationContext from "./contexts/NotificationContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const blogFormRef = useRef();
  const { notification, notificationDispatch } =
    useContext(NotificationContext);
  const queryClient = useQueryClient();
  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(["blogs"], blogs.concat(newBlog));
    },
  });
  const updateBlogMutation = useMutation({
    mutationFn: async ({ blog }) => await blogService.update(blog),
    onSuccess: (updatedBlog, { userObject }) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      updatedBlog = { ...updatedBlog, user: userObject };
      const updatedBlogs = blogs.map((blog) =>
        blog.id !== updatedBlog.id ? blog : updatedBlog
      );
      queryClient.setQueryData(["blogs"], updatedBlogs);
    },
  });
  const removeBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: (data, id) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(
        ["blogs"],
        blogs.filter((blog) => blog.id != id)
      );
    },
  });

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
      notificationDispatch({
        type: "SET",
        payload: "wrong username or password",
      });
      setTimeout(() => {
        notificationDispatch({ type: "CLEAR" });
      }, 5000);
    }
  };

  const handleLogout = async () => {
    window.localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  const addBlog = (blog) => {
    blogService.setToken(user.token);
    newBlogMutation.mutate({ ...blog });
    blogFormRef.current.toggleVisibility();
    notificationDispatch({
      type: "SET",
      payload: `a new blog ${blog.title} by ${blog.author} added`,
    });
    setTimeout(() => {
      notificationDispatch({ type: "CLEAR" });
    }, 5000);
  };

  const addLikes = async (blogToUpdate) => {
    blogService.setToken(user.token);
    updateBlogMutation.mutate({
      blog: { ...blogToUpdate, likes: blogToUpdate.likes + 1 },
      userObject: blogToUpdate.user,
    });
  };

  const removeBlog = async (blogToRemove) => {
    if (
      window.confirm(
        `Remove blog ${blogToRemove.title} by ${blogToRemove.author}`
      )
    ) {
      blogService.setToken(user.token);
      removeBlogMutation.mutate(blogToRemove.id);
    }
  };

  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  const blogs = result.data;

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification type={"error"} message={notification} />
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
      <Notification type={"success"} message={notification} />
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
