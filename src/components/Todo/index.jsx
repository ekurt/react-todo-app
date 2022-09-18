import React from "react";
import { FaCheckCircle, FaRegCircle, FaTimes } from "react-icons/fa";
import styles from "./index.module.css";

export const Todo = () => {
  return (
    <>
      <div className={styles.todo}>
        <FaCheckCircle
          size={30}
          fill={"rgb(190, 130, 255)"}
          className={styles.check}
        />
        <span className={`${styles.todoItem} ${styles.done}`}>
          Complete todo list project
        </span>
        <FaTimes size={15} className={styles.times} />
      </div>
      <div className={styles.todo}>
        <FaRegCircle
          size={30}
          fill={"rgb(190, 130, 255)"}
          className={styles.check}
        />
        <span className={`${styles.todoItem}`}>
          Complete todo list project
        </span>
        <FaTimes size={15} className={styles.times} />
      </div>
    </>
  );
};
