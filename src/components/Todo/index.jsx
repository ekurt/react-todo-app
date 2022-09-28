import React, { useState } from "react";
import classNames from "classnames";
import { FaCheckCircle, FaRegCircle, FaTimes } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";
import styles from "./index.module.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ReactCardFlip from "react-card-flip";
import useSound from "use-sound";

export const Todo = ({ todo, doneHandle, deleteHandle, notify }) => {
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
    volume: 0.25,
  });

  const priorities = ["Normal", "Low", "Medium", "High"];

  return (
    <ReactCardFlip isFlipped={flip} flipDirection="vertical">
      <div
        className={todoClass}
        onContextMenuCapture={() => {
          setFlip(!flip);
          playFlip();
        }}
        onTouchStartCapture={(e) => {
          if (e.touches.length === 2) {
            setFlip(!flip);
            playFlip();
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
          <span className={todoItem}>{todo.todo}</span>
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
          playFlip();
        }}
        onTouchStartCapture={(e) => {
          if (e.touches.length === 2) {
            setFlip(!flip);
            playFlip();
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
