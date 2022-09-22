import React, { useState, useEffect } from "react";
import classNames from "classnames";
import styles from "./index.module.css";

export const TodoFooter = ({
  todos,
  deleteCompletedHandle,
  setFilter,
  setDragDisabled,
}) => {
  let link = classNames(styles.pointer, { [styles.active]: todos.done });

  const activeTodosCount = todos.filter((todo) => !todo.done).length;
  const completedTodosCount = todos.filter((todo) => todo.done).length;

  const [count, setCount] = useState(activeTodosCount);

  useEffect(() => {
    setCount(activeTodosCount);
  }, [todos]);

  const [active, setActive] = useState({
    state: "all",
  });

  return (
    <>
      <div className={styles.todoFooter}>
        <span>
          {count} {count == 0 || count == 1 ? "item" : "items"} left
        </span>
        
        <div className={styles.middle}>
          <span
            onClick={() => {
              setFilter(null);
              setActive({
                state: "all",
              });
              setDragDisabled(false)
            }}
            className={classNames(styles.pointer, {
              [styles.active]: active.state === "all",
            })}
          >
            All
          </span>
          <span
            onClick={() => {
              setFilter(false);
              setActive({
                state: "active",
              });
              setDragDisabled(true)
            }}
            className={classNames(styles.pointer, {
              [styles.active]: active.state === "active",
              [styles.disabled]: todos.length === 0 || activeTodosCount === 0,
            })}
          >
            Active
          </span>
          <span
            onClick={() => {
              setFilter(true);
              setActive({
                state: "completed",
              });
              setDragDisabled(true)
            }}
            className={classNames(styles.pointer, {
              [styles.active]: active.state === "completed",
              [styles.disabled]:
                todos.length === 0 || completedTodosCount === 0,
            })}
          >
            Completed
          </span>
        </div>

        <span
          onClick={deleteCompletedHandle}
          className={classNames(styles.pointer, {
            [styles.disabled]: todos.length === 0 || completedTodosCount === 0,
          })}
        >
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
            setDragDisabled(false)
          }}
          className={classNames(styles.pointer, {
            [styles.active]: active.state === "all",
          })}
        >
          All
        </span>
        <span
          onClick={() => {
            setFilter(false);
            setActive({
              state: "active",
            });
            setDragDisabled(true)
          }}
          className={classNames(styles.pointer, {
            [styles.active]: active.state === "active",
            [styles.disabled]: todos.length === 0 || activeTodosCount === 0,
          })}
        >
          Active
        </span>
        <span
          onClick={() => {
            setFilter(true);
            setActive({
              state: "completed",
            });
            setDragDisabled(true)
          }}
          className={classNames(styles.pointer, {
            [styles.active]: active.state === "completed",
            [styles.disabled]: todos.length === 0 || completedTodosCount === 0,
          })}
        >
          Completed
        </span>
      </div>
    </>
  );
};
