import React from "react";
import { FaCircleNotch } from "react-icons/fa";
import styles from "./index.module.css";

export const TodoForm = ({ submitHandle, changeHandle, todo }) => {
  return (
    <div className={styles.todoForm}>
      <svg width="0" height="0">
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop stopColor="#2ec0ff" offset="0%" />
          <stop stopColor="#be82ff" offset="60%" />
        </linearGradient>
      </svg>
      <form className={styles.form} onSubmit={submitHandle}>
        <FaCircleNotch
          size={30}
          style={{ fill: "url(#gradient)" }}
          className={styles.icon}
        />
        <input
          type="text"
          className={styles.input}
          placeholder="Create a new todo . ."
          value={todo}
          onChange={changeHandle}
          autoFocus
        />
      </form>
    </div>
  );
};
