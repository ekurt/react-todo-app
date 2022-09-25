import React from "react";
import classNames from "classnames";
import styles from "./index.module.css";

export const Header = ({ todos, sortHandle, deleteAllHandle }) => {
  return (
    <div className={styles.header}>
      <h1 className={styles.h1}>TODO</h1>
      <div className={styles.buttons}>
        <span
          className={classNames(styles.sort, {
            [styles.disabled]: todos.length === 0,
          })}
          onClick={sortHandle}
        >
          Sort
        </span>
        <span
          className={classNames(styles.clear, {
            [styles.disabled]: todos.length === 0,
          })}
          onClick={deleteAllHandle}
        >
          Clear All
        </span>
      </div>
    </div>
  );
};
