import React from "react";
import classNames from "classnames";
import styles from "./index.module.css";

export const FooterFilter = ({
  style,
  todos,
  active,
  activeTodosCount,
  completedTodosCount,
  setFilter,
  setActive,
  setDragDisabled,
}) => {
  return (
    <div className={style}>
      <span
        onClick={() => {
          setFilter(null);
          setActive({
            state: "all",
          });
          setDragDisabled(false);
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
          setDragDisabled(true);
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
          setDragDisabled(true);
        }}
        className={classNames(styles.pointer, {
          [styles.active]: active.state === "completed",
          [styles.disabled]: todos.length === 0 || completedTodosCount === 0,
        })}
      >
        Completed
      </span>
    </div>
  );
};
