import React, { useState } from "react";
import classNames from "classnames";
import { FaCheckCircle, FaRegCircle, FaTimes } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";
import styles from "./index.module.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ReactCardFlip from "react-card-flip";
import useSound from "use-sound";
import ReactHtmlParser from "react-html-parser";
import { useDispatch, useSelector } from "react-redux";
import { setTodos } from "../../stores/todo";
import { toast } from "react-toastify";

export const Todo = ({ todo }) => {
  const dispatch = useDispatch();
  const { volumes, muted } = useSelector((state) => state.site);
  const { todos } = useSelector((state) => state.todo);

  let todoItem = classNames(styles.todoItem, { [styles.done]: todo.done });
  let todoClass = classNames(
    styles.todo,
    { [styles.normal]: todo.priority === 0 },
    { [styles.low]: todo.priority === 1 },
    { [styles.medium]: todo.priority === 2 },
    { [styles.high]: todo.priority === 3 }
  );

  const [flip, setFlip] = useState(false);

  const [playFlip] = useSound("assets/sounds/flip.wav", {
    volume: volumes.playFlip,
  });

  const [playCheck] = useSound("assets/sounds/check.wav", {
    volume: volumes.playCheck,
  });

  const [playRemove] = useSound("assets/sounds/remove.wav", {
    volume: volumes.playRemove,
  });

  const priorities = ["Normal", "Low", "Medium", "High"];

  const convertTag = (todo) => {
    return ReactHtmlParser(
      todo.replace(/\[/g, "<mark>").replace(/\]/g, "</mark>")
    );
  };

  const notify = () => {
    toast(`📋 Copied to clipboard!`, {
      position: "top-right",
      theme: "light",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const doneHandle = (id) => {
    if (!muted) {
      playCheck();
    }
    dispatch(
      setTodos(
        todos
          .map((todo) => {
            if (todo.id == id) {
              return {
                ...todo,
                done: !todo.done,
              };
            }
            return todo;
          })
          .sort((a, b) => (a.done > b.done ? 1 : b.done > a.done ? -1 : 0))
      )
    );
  };

  const deleteHandle = (id) => {
    if (!muted) {
      playRemove();
    }
    dispatch(setTodos(todos.filter((todo) => todo.id !== id)));
  };

  return (
    <ReactCardFlip isFlipped={flip} flipDirection="vertical">
      <div
        className={todoClass}
        onContextMenuCapture={() => {
          setFlip(!flip);
          if (!muted) {
            playFlip();
          }
        }}
        onTouchStartCapture={(e) => {
          if (e.touches.length === 2) {
            setFlip(!flip);
            if (!muted) {
              playFlip();
            }
          }
        }}
      >
        <svg width="0" height="0">
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop stopColor="#2ec0ff" offset="0%" />
            <stop stopColor="#be82ff" offset="60%" />
          </linearGradient>
        </svg>
        {todo.done ? (
          <FaCheckCircle
            size={30}
            style={{ fill: "url(#gradient)" }}
            className={styles.check}
            onClick={() => doneHandle(todo.id)}
          />
        ) : (
          <FaRegCircle
            size={30}
            style={{ fill: "url(#gradient)" }}
            className={styles.check}
            onClick={() => doneHandle(todo.id)}
          />
        )}

        <CopyToClipboard text={todo.todo} onCopy={notify}>
          <span className={todoItem}>{convertTag(todo.todo)}</span>
        </CopyToClipboard>

        <FaTimes
          onClick={() => deleteHandle(todo.id)}
          size={15}
          className={styles.times}
        />
      </div>
      <div
        className={todoClass}
        onContextMenuCapture={() => {
          setFlip(!flip);
          if (!muted) {
            playFlip();
          }
        }}
        onTouchStartCapture={(e) => {
          if (e.touches.length === 2) {
            setFlip(!flip);
            if (!muted) {
              playFlip();
            }
          }
        }}
      >
        <div className={styles.back}>
          <span className={styles.dateContainer}>
            <BsInfoCircle
              size={30}
              style={{ fill: "url(#gradient)" }}
              className={styles.info}
            />
            <span className={styles.created}>Created at:</span>
            <span className={styles.date}>{todo.date}</span>
          </span>
          <span>
            <span className={styles.priority}>Priority:</span>
            <span className={styles[priorities[todo.priority]]}>
              {priorities[todo.priority]}
            </span>
          </span>
        </div>
      </div>
    </ReactCardFlip>
  );
};
