import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    changeFilter(state, action) {
      if (action.type === "filter/changeFilter") {
        return action.payload;
      }
    },
  },
});

export const { changeFilter } = filterSlice.actions;
export default filterSlice.reducer;
