import { createContext, useReducer } from "react";

const UserReducer = (state, action) => {
  switch (action.type) {
    case "SET": {
      const user = action.payload;
      return {
        name: user.name,
        token: user.token,
        username: user.username,
      };
    }
    case "REMOVE":
      return null;
  }
};

const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(UserReducer, null);

  return (
    <UserContext.Provider value={{ user, userDispatch }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
