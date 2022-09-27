import React, { useState, useEffect } from "react";
import { TodoForm, TodoList, Header, Footer } from "./components";
import styles from "./App.module.css";

const LOCAL_STORAGE_KEY = "react-todo-list-todos";

function App() {
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
      todo: "🚦 You can set priority by @0, @1, @2, @3",
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
      todo: "💻 You can right click for info (Desktop)",
      done: false,
      date: new Date().toLocaleString(),
      priority: 3,
    },
      
    {
      id: Date.now() + 5,
      todo: "📱 You can two finger click for info (Mobile)",
      done: false,
      date: new Date().toLocaleString(),
      priority: 3,
    },
  ].sort((a, b) =>
    b.priority > a.priority ? 1 : a.priority > b.priority ? -1 : 0
  );

  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || starterList
  );
  const [todo, setTodo] = useState("");
  const [priority, setPriority] = useState(0);
  const [filter, setFilter] = useState(null);
  const [sort, setSort] = useState(false);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    setPriority(0);
  }, [todos]);

  const submitHandle = (e) => {
    e.preventDefault();

    if (!todo) return;

    setTodos([
      {
        id: Date.now(),
        todo: todo,
        done: false,
        date: new Date().toLocaleString(),
        priority: priority,
      },
      ...todos,
    ]);

    setTodo("");
  };

  const changeHandle = (e) => {
    e.preventDefault();

    if (/@[0123]+/.test(e.target.value)) {
      setTodo(e.target.value.replace(/@[0123]+/, ""));
      setPriority(Number(e.target.value.match(/@[0123]+/)[0].replace("@", "")));
    } else {
      setTodo(e.target.value);
    }
  };

  const doneHandle = (id) => {
    setTodos(
      todos
        .map((todo) => {
          if (todo.id == id) {
            return {
              ...todo,
              done: !todo.done,
            };
          }
          return todo;
        })
        .sort((a, b) => (a.done > b.done ? 1 : b.done > a.done ? -1 : 0))
    );
  };

  const sortHandle = () => {
    setTodos(
      todos
        .map((todo) => todo)
        .sort((a, b) => {
          if (sort) {
            if (!a.done && !b.done) {
              setSort(false);
              return a.priority > b.priority
                ? 1
                : b.priority > a.priority
                ? -1
                : 0;
            }
          } else {
            if (!a.done && !b.done) {
              setSort(true);
              return b.priority > a.priority
                ? 1
                : a.priority > b.priority
                ? -1
                : 0;
            }
          }
        })
    );
  };

  const deleteAllHandle = () => {
    setTodos([]);
  };

  const deleteHandle = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const deleteCompletedHandle = () => {
    setTodos(todos.filter((todo) => !todo.done));
  };

  return (
    <div className={styles.app}>
      <div className={styles.main}>
        <Header
          todos={todos}
          sortHandle={sortHandle}
          deleteAllHandle={deleteAllHandle}
        />

        <TodoForm
          submitHandle={submitHandle}
          changeHandle={changeHandle}
          todo={todo}
        />

        <TodoList
          todo={todo}
          todos={todos}
          setTodos={setTodos}
          doneHandle={doneHandle}
          deleteHandle={deleteHandle}
          deleteCompletedHandle={deleteCompletedHandle}
          filter={filter}
          setFilter={setFilter}
          priority={priority}
        />

        <Footer />
      </div>
    </div>
  );
}

export default App;
