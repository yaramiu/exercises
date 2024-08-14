import { useState, useEffect, useContext } from "react";
import loginService from "./services/login";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import "./index.css";
import NotificationContext from "./contexts/NotificationContext";
import UserContext from "./contexts/UserContext";
import Users from "./components/Users";
import User from "./components/User";
import BlogList from "./components/BlogList";
import Blog from "./components/Blog";
import { Routes, Route, useMatch, Link } from "react-router-dom";
import { useQueryClient, useMutation } from "@tanstack/react-query";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { notification, notificationDispatch } =
    useContext(NotificationContext);
  const { user, userDispatch } = useContext(UserContext);
  const queryClient = useQueryClient();
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

  useEffect(() => {
    const setupLoggedInUser = async () => {
      const loggedInUserJSON = window.localStorage.getItem("loggedInUser");
      if (loggedInUserJSON) {
        userDispatch({ type: "SET", payload: JSON.parse(loggedInUserJSON) });
      }
    };

    setupLoggedInUser();
  }, [userDispatch]);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const loggedInUser = await loginService.login({ username, password });
      window.localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
      userDispatch({ type: "SET", payload: loggedInUser });
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
    userDispatch({ type: "REMOVE" });
  };

  const userMatch = useMatch("/users/:id");
  const users = queryClient.getQueryData(["users"]);
  const clickedUser =
    userMatch && users
      ? users.find((user) => user.id === userMatch.params.id)
      : null;

  const blogMatch = useMatch("/blogs/:id");
  const blogs = queryClient.getQueryData(["blogs"]);
  const clickedBlog =
    blogMatch && blogs
      ? blogs.find((blog) => blog.id === blogMatch.params.id)
      : null;

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
      <div className="container">
        <Link to={"/blogs"}>blogs</Link> <Link to={"/users"}>users</Link>{" "}
        {user.name} logged in{" "}
        <button type="button" onClick={handleLogout}>
          logout
        </button>
      </div>
      <h2>blog app</h2>
      <Notification type={"success"} message={notification} />

      <Routes>
        <Route
          path="/blogs"
          element={<BlogList addLikes={addLikes} removeBlog={removeBlog} />}
        />
        <Route
          path="/blogs/:id"
          element={
            <Blog
              blog={clickedBlog}
              addLikes={addLikes}
              currentlyViewingUser={user}
              isClicked={true}
              removeBlog={removeBlog}
            />
          }
        />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User user={clickedUser} />} />
      </Routes>
    </div>
  );
};

export default App;
