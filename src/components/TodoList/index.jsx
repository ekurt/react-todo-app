import React from "react";
import { Todo, TodoFooter } from "../";
import styles from "./index.module.css";

export const TodoList = ({ todos, doneHandle, deleteHandle, deleteCompletedHandle }) => {
  return (
    <div className={styles.todoList}>
      {todos.map((item, index) => (
        <Todo key={index} todo={item} doneHandle={doneHandle} deleteHandle={deleteHandle} />
      ))}
      <TodoFooter todos={todos} deleteCompletedHandle={deleteCompletedHandle} />
    </div>
  );
};
