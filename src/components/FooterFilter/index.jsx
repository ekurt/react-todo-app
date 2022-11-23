import React from "react";
import classNames from "classnames";
import styles from "./index.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setFilter, setActive, setDragDisabled } from "../../stores/site";

export const FooterFilter = ({
  style,
  activeTodosCount,
  completedTodosCount,
}) => {
  const dispatch = useDispatch();
  const { active } = useSelector((state) => state.site);
  const { todos } = useSelector((state) => state.todo);

  return (
    <div className={style}>
      <span
        onClick={() => {
          dispatch(setFilter(null));
          dispatch(
            setActive({
              state: "all",
            })
          );
          dispatch(setDragDisabled(false));
        }}
        className={classNames(styles.pointer, {
          [styles.active]: active.state === "all",
        })}
      >
        All
      </span>
      <span
        onClick={() => {
          dispatch(setFilter(false));
          dispatch(
            setActive({
              state: "active",
            })
          );
          dispatch(setDragDisabled(true));
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
          dispatch(setFilter(true));
          dispatch(
            setActive({
              state: "completed",
            })
          );
          dispatch(setDragDisabled(true));
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
