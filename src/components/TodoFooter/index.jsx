import React, { useState, useEffect } from "react";
import classNames from "classnames";
import styles from "./index.module.css";

export const TodoFooter = ({ todos, deleteCompletedHandle, setFilter }) => {
  let link = classNames(styles.pointer, { [styles.active]: todos.done });

  const todoCount = todos.filter((todo) => !todo.done).length;

  const [count, setCount] = useState(todoCount);

  useEffect(() => {
    setCount(todoCount);
  }, [todos]);

  const [active, setActive] = useState({
    state: "all",
  });

  return (
    <>
    <div className={styles.todoFooter}>
      <span>{count} items left</span>
      <div className={styles.middle}>
        <span
          onClick={() => {
            setFilter(null);
            setActive({
              state: "all",
            });
          }}
          className={classNames(styles.pointer, { [styles.active]: active.state === "all" })}
        >
          All
        </span>
        <span
          onClick={() => {
            setFilter(false);
            setActive({
              state: "active",
            });
          }}
          className={classNames(styles.pointer, { [styles.active]: active.state === "active" })}
        >
          Active
        </span>
        <span
          onClick={() => {
            setFilter(true);
            setActive({
              state: "completed",
            });
          }}
          className={classNames(styles.pointer, { [styles.active]: active.state === "completed" })}
        >
          Completed
        </span>
      </div>
      <span onClick={deleteCompletedHandle} className={styles.pointer}>
        Clear Completed
      </span>
    </div>

    <div className={styles.bottom}>
    <span
          onClick={() => {
            setFilter(null);
            setActive({
              state: "all",
            });
          }}
          className={classNames(styles.pointer, { [styles.active]: active.state === "all" })}
        >
          All
        </span>
        <span
          onClick={() => {
            setFilter(false);
            setActive({
              state: "active",
            });
          }}
          className={classNames(styles.pointer, { [styles.active]: active.state === "active" })}
        >
          Active
        </span>
        <span
          onClick={() => {
            setFilter(true);
            setActive({
              state: "completed",
            });
          }}
          className={classNames(styles.pointer, { [styles.active]: active.state === "completed" })}
        >
          Completed
        </span>
      </div>
    </>
  );
};
