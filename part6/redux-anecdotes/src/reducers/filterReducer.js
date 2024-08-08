export const changeFilter = (content) => {
  return {
    type: "FILTER",
    payload: content,
  };
};

const filterReducer = (state = "", action) => {
  switch (action.type) {
    case "FILTER":
      return action.payload;
    default:
      return state;
  }
};

export default filterReducer;
