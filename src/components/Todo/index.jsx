import React from "react";
import classNames from "classnames";
import { FaCheckCircle, FaRegCircle, FaTimes } from "react-icons/fa";
import styles from "./index.module.css";

export const Todo = ({ todo, doneHandle, deleteHandle }) => {
  let todoItem = classNames(styles.todoItem, { [styles.done]: todo.done });

  return (
    <div className={styles.todo}>
      <svg width="0" height="0">
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop stopColor="#2ec0ff" offset="0%" />
          <stop stopColor="#be82ff" offset="60%" />
        </linearGradient>
      </svg>
      {todo.done ? (
        <FaCheckCircle
          size={30}
          style={{ fill: "url(#gradient)" }}
          className={styles.check}
          onClick={() => doneHandle(todo.id)}
        />
      ) : (
        <FaRegCircle
          size={30}
          style={{ fill: "url(#gradient)" }}
          className={styles.check}
          onClick={() => doneHandle(todo.id)}
        />
      )}
      <span className={todoItem}>{todo.todo}</span>
      <FaTimes onClick={() => deleteHandle(todo.id)} size={15} className={styles.times} />
    </div>
  );
};
