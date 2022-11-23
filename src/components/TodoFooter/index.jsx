import React, { useState, useEffect } from "react";
import { FooterFilter } from "../";
import classNames from "classnames";
import styles from "./index.module.css";
import { setTodos } from "../../stores/todo";
import { useDispatch, useSelector } from "react-redux";

export const TodoFooter = () => {
  const dispatch = useDispatch();
  const { todos } = useSelector((state) => state.todo);

  const activeTodosCount = todos.filter((todo) => !todo.done).length;
  const completedTodosCount = todos.filter((todo) => todo.done).length;

  const [count, setCount] = useState(activeTodosCount);

  useEffect(() => {
    setCount(activeTodosCount);
  }, [todos]);

  const deleteCompletedHandle = () => {
    dispatch(setTodos(todos.filter((todo) => !todo.done)));
  };

  return (
    <>
      <div className={styles.todoFooter}>
        <span>
          {count} {count == 0 || count == 1 ? "item" : "items"} left
        </span>

        <FooterFilter
          style={styles.middle}
          activeTodosCount={activeTodosCount}
          completedTodosCount={completedTodosCount}
        />

        <span
          onClick={deleteCompletedHandle}
          className={classNames(styles.pointer, {
            [styles.disabled]: todos.length === 0 || completedTodosCount === 0,
          })}
        >
          Clear Completed
        </span>
      </div>

      <FooterFilter
        style={styles.bottom}
        activeTodosCount={activeTodosCount}
        completedTodosCount={completedTodosCount}
      />
    </>
  );
};
