import { createSlice } from "@reduxjs/toolkit";

const starterList = [
  {
    id: Date.now() + 1,
    todo: "📋 You can copy todo by press on it",
    done: false,
    date: new Date().toLocaleString(),
    priority: 0,
  },
  {
    id: Date.now() + 2,
    todo: "🚦 You can set priority by [@0] [@1] [@2] [@3]",
    done: false,
    date: new Date().toLocaleString(),
    priority: 2,
  },
  {
    id: Date.now() + 3,
    todo: "✨ You can drag-drop todos",
    done: false,
    date: new Date().toLocaleString(),
    priority: 1,
  },
  {
    id: Date.now() + 4,
    todo: "💻 You can right click for info [Desktop]",
    done: false,
    date: new Date().toLocaleString(),
    priority: 3,
  },
  {
    id: Date.now() + 5,
    todo: "📱 You can two finger click for info [Mobile]",
    done: false,
    date: new Date().toLocaleString(),
    priority: 3,
  },
  {
    id: Date.now() + 6,
    todo: "🔖 You can add [tag] with brackets [&#91tag name&#93]",
    done: false,
    date: new Date().toLocaleString(),
    priority: 2,
  },
].sort((a, b) =>
  b.priority > a.priority ? 1 : a.priority > b.priority ? -1 : 0
);

const LOCAL_STORAGE_TODOS = "todo-app-todos";

export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todo: "",
    todos: JSON.parse(localStorage.getItem(LOCAL_STORAGE_TODOS)) || starterList,
  },
  reducers: {
    setTodo: (state, action) => {
      state.todo = action.payload;
    },
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
  },
});

export const { setTodo, setTodos } = todoSlice.actions;

export default todoSlice.reducer;
