import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setMessage(state, action) {
      return action.payload;
    },
    // eslint-disable-next-line no-unused-vars
    clearNotification(state, action) {
      return "";
    },
  },
});

export const { setMessage, clearNotification } = notificationSlice.actions;

export const setNotification = (message, timeInSeconds) => {
  return (dispatch) => {
    dispatch(setMessage(message));
    const timeInMilliseconds = timeInSeconds / 0.001;
    setTimeout(() => dispatch(clearNotification()), timeInMilliseconds);
  };
};

export default notificationSlice.reducer;
