import React, { useState, useEffect } from "react";
import { TodoForm, TodoList, Header, Footer } from "./components";
import styles from "./App.module.css";

const LOCAL_STORAGE_KEY = "react-todo-list-todos";

function App() {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [
      {
        id: Date.now() + 1,
        todo: "📋 You can copy todo by press on it",
        done: false,
        date: new Date().toLocaleString(),
        priority: 0,
      },
      {
        id: Date.now() + 2,
        todo: "👌 You can set priority by @[0-1-2-3]",
        done: false,
        date: new Date().toLocaleString(),
        priority: 2,
      },
      {
        id: Date.now() + 3,
        todo: "✅ You can finish todo by checked",
        done: false,
        date: new Date().toLocaleString(),
        priority: 3,
      },
      {
        id: Date.now() + 4,
        todo: "❎ You can delete todo",
        done: false,
        date: new Date().toLocaleString(),
        priority: 3,
      },
      {
        id: Date.now() + 5,
        todo: "❎ You can uncheck todo",
        done: true,
        date: new Date().toLocaleString(),
        priority: 3,
      },
    ]
  );

  const [todo, setTodo] = useState("");
  const [priority, setPriority] = useState(0);
  const [filter, setFilter] = useState(null);

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

  const deleteHandle = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const deleteCompletedHandle = () => {
    setTodos(todos.filter((todo) => !todo.done));
  };

  return (
    <div className={styles.app}>
      <div className={styles.main}>
        <Header />

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
