import { useState, useEffect, useContext } from "react";
import loginService from "./services/login";
import userService from "./services/users";
import Notification from "./components/Notification";
import "./index.css";
import NotificationContext from "./contexts/NotificationContext";
import UserContext from "./contexts/UserContext";
import Users from "./components/Users";
import User from "./components/User";
import BlogList from "./components/BlogList";
import { Routes, Route, useMatch } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { notification, notificationDispatch } =
    useContext(NotificationContext);
  const { user, userDispatch } = useContext(UserContext);

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

  const result = useQuery({
    queryKey: ["users"],
    queryFn: userService.getAll,
  });

  const users = result.data;

  const match = useMatch("/users/:id");
  const clickedUser =
    match && users ? users.find((user) => user.id === match.params.id) : null;

  if (result.isLoading) return <div>loading data...</div>;
  if (result.isError) return <div>error fetching data from server</div>;

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
        <p>{user.name} logged in</p>
        <button type="button" onClick={handleLogout}>
          logout
        </button>
      </div>

      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/users/:id" element={<User user={clickedUser} />} />
      </Routes>
    </div>
  );
};

export default App;
