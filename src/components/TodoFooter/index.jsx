import React, { useState, useEffect } from "react";
import classNames from "classnames";
import styles from "./index.module.css";

export const TodoFooter = ({ todos, deleteCompletedHandle }) => {
  let link = classNames(styles.pointer, { [styles.active]: todos.done });

  const todoCount = todos.filter((todo) => !todo.done).length;

  const [count, setCount] = useState(todoCount);

  useEffect(() => {
    setCount(todoCount);
  }, [todos]);

  return (
    <div className={styles.todoFooter}>
      <span>{count} items left</span>
      {/*
      <div className={styles.middle}>
        <span className={link}>All</span>
        <span className={link}>Active</span>
        <span className={link}>Completed</span>
      </div> 
      */}
      <span onClick={deleteCompletedHandle} className={styles.pointer}>
        Clear Completed
      </span>
    </div>
  );
};
