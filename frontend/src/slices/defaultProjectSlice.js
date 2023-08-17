import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  defaultProject: localStorage.getItem("defaultProject")
    ? JSON.parse(localStorage.getItem("defaultProject"))
    : null,
};

const defaultProjectSlice = createSlice({
  name: "defaultProject",
  initialState,
  reducers: {
    setDefaultProject: (state, action) => {
      state.defaultProject = action.payload;
      localStorage.setItem('defaultProject', JSON.stringify(action.payload));
    },
    clearDefaultProject: (state) => {
      state.defaultProject = null;
      localStorage.removeItem('defaultProject');
    },
  },
});

export const { setDefaultProject, clearDefaultProject } = defaultProjectSlice.actions;

export default defaultProjectSlice.reducer;