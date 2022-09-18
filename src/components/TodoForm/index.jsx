import React from "react";
import { FaCircleNotch } from "react-icons/fa";
import styles from "./index.module.css";

export const TodoForm = () => {
  return (
    <div className={styles.todoForm}>
      <form className={styles.form}>
        <FaCircleNotch
          size={30}
          fill={"rgb(45, 194, 255)"}
          className={styles.icon}
        />
        <input
          type="text"
          className={styles.input}
          placeholder="Create a new todo . ."
          autoFocus
        />
      </form>
    </div>
  );
};
