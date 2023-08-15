import { createSlice } from "@reduxjs/toolkit";

const defaultProjectSlice = createSlice({
  name: "defaultProject",
  initialState: null,
  reducers: {
    setDefaultProject: (state, action) => {
      return action.payload;
    },
    clearDefaultProject: (state) => {
      return null;
    },
  },
});

export const { setDefaultProject, clearDefaultProject } = defaultProjectSlice.actions;

export default defaultProjectSlice.reducer;