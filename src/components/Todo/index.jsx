import React from "react";
import classNames from "classnames";
import { FaCheckCircle, FaRegCircle, FaTimes } from "react-icons/fa";
import styles from "./index.module.css";

export const Todo = ({ todo, doneHandle, deleteHandle }) => {
  let todoItem = classNames(styles.todoItem, { [styles.done]: todo.done });

  const clickDoneHandle = () => {
    doneHandle(todo.id);
  };

  const clickDeleteHandle = () => {
    deleteHandle(todo.id);
  };

  return (
    <div className={styles.todo}>
      {todo.done ? (
        <FaCheckCircle
          size={30}
          fill={"rgb(190, 130, 255)"}
          className={styles.check}
          onClick={clickDoneHandle}
        />
      ) : (
        <FaRegCircle
          size={30}
          fill={"rgb(190, 130, 255)"}
          className={styles.check}
          onClick={clickDoneHandle}
        />
      )}
      <span className={todoItem}>{todo.todo}</span>
      <FaTimes onClick={clickDeleteHandle} size={15} className={styles.times} />
    </div>
  );
};
