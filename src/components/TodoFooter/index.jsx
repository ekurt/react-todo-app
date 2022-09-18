import React from "react";
import styles from "./index.module.css";

export const TodoFooter = () => {
  return (
    <div className={styles.todoFooter}>
      <span>5 items left</span>
      <div className={styles.middle}>
        <span className={styles.active}>All</span>
        <span>Active</span>
        <span>Completed</span>
      </div>
      <span>Clear Completed</span>
    </div>
  );
};
