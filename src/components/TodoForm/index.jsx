import React from "react";
import { FaCircle, FaCircleNotch, FaDotCircle } from "react-icons/fa";
import styles from "./index.module.css";
import useSound from "use-sound";
import { useDispatch, useSelector } from "react-redux";
import { setPriority, setWait } from "../../stores/site";
import { setTodo, setTodos } from "../../stores/todo";

export const TodoForm = () => {
  const dispatch = useDispatch();
  const { priority, volumes, muted } = useSelector((state) => state.site);
  const { todos, todo } = useSelector((state) => state.todo);

  const doneTodosLength = todos.filter((todo) => !todo.done).length;
  const [playCheck] = useSound("assets/sounds/check.wav", {
    volume: volumes.playCheck,
  });

  const [playRemove] = useSound("assets/sounds/remove.wav", {
    volume: volumes.playRemove,
  });

  const [playScribble] = useSound("assets/sounds/scribble.wav", {
    volume: volumes.playScribble,
  });

  const submitHandle = (e) => {
    e.preventDefault();

    dispatch(setWait(true));

    if (!todo) return;

    if (!muted) {
      playScribble();
    }

    setTimeout(() => {
      dispatch(
        setTodos([
          {
            id: Date.now(),
            todo: todo.trim(),
            done: false,
            date: new Date().toLocaleString(),
            priority: priority,
          },
          ...todos,
        ])
      );

      dispatch(setWait(false));
    }, 300);

    dispatch(setTodo(""));
  };

  const changeHandle = (e) => {
    e.preventDefault();

    if (/@[0123]+/.test(e.target.value)) {
      dispatch(setTodo(e.target.value.replace(/@[0123]+/, "")));
      dispatch(
        setPriority(
          Number(e.target.value.match(/@[0123]+/)[0].replace("@", ""))
        )
      );
    } else {
      dispatch(setTodo(e.target.value.replace(/ {2,}/g, " ")));
    }
  };

  const doneAllHandle = (state) => {
    if (!muted) {
      playCheck();
    }
    dispatch(
      setTodos(
        todos
          .map((todo) => {
            return {
              ...todo,
              done: state,
            };
          })
          .sort((a, b) => (a.done > b.done ? 1 : b.done > a.done ? -1 : 0))
      )
    );
  };

  let icon;

  if (todos.length === 0) {
    icon = (
      <FaDotCircle
        size={30}
        style={{ fill: "url(#gradient)" }}
        className={styles.icon}
      />
    );
  } else {
    if (doneTodosLength > 0) {
      icon = (
        <FaCircleNotch
          size={30}
          style={{ fill: "url(#gradient)" }}
          className={styles.icon}
          onClick={() => doneAllHandle(true)}
          title="Check All"
        />
      );
    } else {
      icon = (
        <FaCircle
          size={30}
          style={{ fill: "url(#gradient)" }}
          className={styles.icon}
          onClick={() => doneAllHandle(false)}
          title="Uncheck All"
        />
      );
    }
  }

  return (
    <div className={styles.todoForm}>
      <svg width="0" height="0">
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop stopColor="#2ec0ff" offset="0%" />
          <stop stopColor="#be82ff" offset="60%" />
        </linearGradient>
      </svg>
      <form className={styles.form} onSubmit={submitHandle}>
        {icon}
        <input
          type="search"
          className={styles.input}
          placeholder="Create a new todo list . ."
          value={todo}
          onChange={changeHandle}
          onKeyUp={(e) => {
            if (e.key === "Escape") {
              dispatch(setTodo(""));
              if (!muted) {
                playRemove();
              }
            }
          }}
          autoFocus
        />
      </form>
    </div>
  );
};
