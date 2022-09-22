import React, { useState, useEffect } from "react";
import { FooterFilter } from "../";
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

        <FooterFilter
          style={styles.middle}
          todos={todos}
          active={active}
          activeTodosCount={activeTodosCount}
          completedTodosCount={completedTodosCount}
          setFilter={setFilter}
          setActive={setActive}
          setDragDisabled={setDragDisabled}
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
        todos={todos}
        active={active}
        activeTodosCount={activeTodosCount}
        completedTodosCount={completedTodosCount}
        setFilter={setFilter}
        setActive={setActive}
        setDragDisabled={setDragDisabled}
      />
    </>
  );
};
