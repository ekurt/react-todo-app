import { createSlice } from "@reduxjs/toolkit";

const LOCAL_STORAGE_MUTED = "todo-app-muted";
const LOCAL_STORAGE_SORTED = "todo-app-sorted";

const values = {
  0: 0,
  1: 1,
};

export const siteSlice = createSlice({
  name: "site",
  initialState: {
    priority: 0,
    filter: null,
    sort: values[localStorage.getItem(LOCAL_STORAGE_SORTED)] ?? 1,
    wait: false,
    muted: values[localStorage.getItem(LOCAL_STORAGE_MUTED)] ?? 0,
    volumes: {},
    isDragDisabled: false,
    active: {
      state: "all",
    },
  },
  reducers: {
    setPriority: (state, action) => {
      state.priority = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setWait: (state, action) => {
      state.wait = action.payload;
    },
    setMuted: (state, action) => {
      state.muted = action.payload;
    },
    setVolumes: (state, action) => {
      state.volumes = action.payload;
    },
    setDragDisabled: (state, action) => {
      state.isDragDisabled = action.payload;
    },
    setActive: (state, action) => {
      state.active = action.payload;
    },
  },
});

export const {
  setPriority,
  setFilter,
  setSort,
  setWait,
  setMuted,
  setVolumes,
  setDragDisabled,
  setActive,
} = siteSlice.actions;

export default siteSlice.reducer;
