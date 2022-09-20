import React, { useState, useEffect } from "react";
import { TodoForm, TodoList } from "./components";
import styles from "./App.module.css";

const LOCAL_STORAGE_KEY = "react-todo-list-todos";

function App() {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || []
  );

  const [todo, setTodo] = useState("");
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storageTodos) {
      setTodos(storageTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const submitHandle = (e) => {
    e.preventDefault();

    setTodos([
      {
        id: Date.now(),
        todo: todo,
        done: false,
      },
      ...todos,
    ]);
    setTodo("");
  };

  const changeHandle = (e) => {
    e.preventDefault();

    setTodo(e.target.value);
  };

  const doneHandle = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id == id) {
          return {
            ...todo,
            done: !todo.done,
          };
        }
        return todo;
      })
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
        <h1 className={styles.h1}>TODO</h1>

        <TodoForm
          submitHandle={submitHandle}
          changeHandle={changeHandle}
          todo={todo}
        />
        <TodoList
          todo={todo}
          todos={todos}
          doneHandle={doneHandle}
          deleteHandle={deleteHandle}
          deleteCompletedHandle={deleteCompletedHandle}
          filter={filter}
          setFilter={setFilter}
        />
      </div>
    </div>
  );
}

export default App;
