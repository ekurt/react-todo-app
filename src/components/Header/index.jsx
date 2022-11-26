import React, { useRef } from "react";
import classNames from "classnames";
import styles from "./index.module.css";
import {
  FaVolumeUp,
  FaVolumeMute,
  FaFileDownload,
  FaFileUpload,
  FaTrash,
  FaSortAmountDownAlt,
  FaSortAmountDown,
  FaGoogle,
  FaSignOutAlt,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import useSound from "use-sound";
import { setTodos } from "../../stores/todo";
import { setMuted, setSort } from "../../stores/site";
import { loginAsync, logoutAsync } from "../../stores/user";

export const Header = () => {
  const dispatch = useDispatch();
  const { muted, sort, volumes, sync, syncWait } = useSelector(
    (state) => state.site
  );
  const { todos } = useSelector((state) => state.todo);
  const { user } = useSelector((state) => state.user);

  const inputFile = useRef(null);

  const [playSort] = useSound("assets/sounds/sort.wav", {
    volume: volumes.playSort,
  });

  const [playClearAll] = useSound("assets/sounds/clearAll.wav", {
    volume: volumes.playClearAll,
  });

  const importDataHandle = (data) => {
    dispatch(setTodos([...data, ...todos]));
  };

  const exportDataHandle = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(todos, null, 2)
    )}`;

    const link = document.createElement("a");
    const date = new Date().toLocaleDateString().replace(/\//g, "-");
    const time = new Date().toLocaleTimeString().replace(/[: ]/g, "-");

    link.href = jsonString;
    link.download = `todos-${date}-${time}.json`;
    link.click();
  };

  const handleChange = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      importDataHandle(JSON.parse(e.target.result));
    };
  };

  const sortHandle = () => {
    if (!muted) {
      playSort();
    }
    dispatch(
      setTodos(
        todos
          .map((todo) => todo)
          .sort((a, b) => {
            if (sort === 1) {
              if (!a.done && !b.done) {
                dispatch(setSort(0));
                return a.priority > b.priority
                  ? 1
                  : b.priority > a.priority
                  ? -1
                  : 0;
              }
            } else {
              if (!a.done && !b.done) {
                dispatch(setSort(1));
                return b.priority > a.priority
                  ? 1
                  : a.priority > b.priority
                  ? -1
                  : 0;
              }
            }
          })
      )
    );
  };

  const deleteAllHandle = () => {
    if (!muted) {
      playClearAll();
    }
    dispatch(setTodos([]));
  };

  const loginHandle = () => {
    dispatch(loginAsync());
  };

  const logoutHandle = () => {
    dispatch(logoutAsync());
    setTimeout(() => {
      dispatch(setTodos([]));
    }, 1000);
  };

  const visitProfileHandle = () => {
    window.open("https://myaccount.google.com/profile");
  };

  return (
    <div className={styles.header}>
      <h1 className={styles.h1}>TODO</h1>
      <div className={styles.buttons}>
        <span
          className={styles.icon}
          onClick={() => dispatch(setMuted(muted === 1 ? 0 : 1))}
        >
          {muted ? (
            <FaVolumeMute size={20} title="Unmute" />
          ) : (
            <FaVolumeUp size={20} title="Mute" />
          )}
        </span>
        <span
          className={classNames(styles.icon, {
            [styles.disabled]: todos.length === 0,
          })}
          onClick={sortHandle}
        >
          {sort ? (
            <FaSortAmountDown size={20} title="Sort by Priority" />
          ) : (
            <FaSortAmountDownAlt size={20} title="Sort by Priority" />
          )}
        </span>
        <span
          className={classNames(styles.icon, {
            [styles.disabled]: todos.length === 0,
          })}
          onClick={deleteAllHandle}
        >
          <FaTrash size={20} title="Clear All" />
        </span>
        <span
          className={classNames(styles.icon)}
          onClick={() => {
            inputFile.current.click();
          }}
        >
          <FaFileUpload size={20} title="Import" />
        </span>
        <span
          className={classNames(styles.icon, {
            [styles.disabled]: todos.length === 0,
          })}
          onClick={exportDataHandle}
        >
          <FaFileDownload size={20} title="Export" />
        </span>
        {!user ? (
          <span className={classNames(styles.icon)} onClick={loginHandle}>
            <FaGoogle size={20} title="Login via Google" />
          </span>
        ) : (
          <>
            <span className={classNames(styles.icon)} onClick={logoutHandle}>
              <FaSignOutAlt size={20} title="Logout" />
            </span>
            <span
              className={classNames(styles.icon, styles.login)}
              onClick={visitProfileHandle}
            >
              <img
                className={styles.img}
                src={user.photo}
                alt={user.email}
                title={user.email}
              />
              <span className={styles.name}>{user.name}</span>
            </span>
          </>
        )}
      </div>
      <input
        type="file"
        id="file"
        ref={inputFile}
        onChange={handleChange}
        accept=".json"
        style={{ display: "none" }}
      />
      <p className={styles.message}>
        {user ? (
          <>Data is storing in your Google account.</>
        ) : (
          <>Data is storing in your browser.</>
        )}
      </p>
    </div>
  );
};
