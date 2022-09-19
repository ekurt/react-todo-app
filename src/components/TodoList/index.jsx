import React, { useState, useEffect } from "react";
import { Todo, TodoFooter } from "../";
import { FaRegDotCircle } from "react-icons/fa";
import styles from "./index.module.css";

export const TodoList = ({
  todo,
  todos,
  doneHandle,
  deleteHandle,
  deleteCompletedHandle,
  filter,
  setFilter,
}) => {
  const [temp, setTemp] = useState(todo);

  useEffect(() => {
    setTemp(todo);
  }, [todo]);

  return (
    <div className={styles.todoList}>
      {temp ? (
        <div className={styles.todo}>
          <FaRegDotCircle
          size={30}
          fill={"rgb(190, 130, 255)"}
          className={styles.check}
        />
          <span className={styles.todoItemTemp}>{temp}</span>
        </div>
      ) : null}

      {todos.length == 0 && !temp ? (
        <div className={styles.todo}>
          <span className={styles.todoItem}>
            There is nothing to do here 🥳
          </span>
        </div>
      ) : null}

      {todos
        .filter((todo) => (filter !== null ? todo.done === filter : todo))
        .map((item, index) => (
          <Todo
            key={index}
            todo={item}
            doneHandle={doneHandle}
            deleteHandle={deleteHandle}
          />
        ))}

      <TodoFooter
        todos={todos}
        deleteCompletedHandle={deleteCompletedHandle}
        setFilter={setFilter}
      />
    </div>
  );
};
