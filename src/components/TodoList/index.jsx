import React from "react";
import { Todo, TodoFooter } from "../";
import styles from "./index.module.css";

export const TodoList = () => {
  const arr = [1, 2];
  return (
    <div className={styles.todoList}>
      {arr.map((item, index) => (
        <Todo key={index} />
      ))}
      <TodoFooter />
    </div>
  );
};
