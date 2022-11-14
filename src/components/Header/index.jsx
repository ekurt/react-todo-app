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
} from "react-icons/fa";

export const Header = ({
  todos,
  sortHandle,
  deleteAllHandle,
  muted,
  setMuted,
  sort,
  importDataHandle,
  exportDataHandle,
}) => {
  const inputFile = useRef(null);

  const handleChange = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      importDataHandle(JSON.parse(e.target.result));
    };
  };

  return (
    <div className={styles.header}>
      <h1 className={styles.h1}>TODO</h1>
      <div className={styles.buttons}>
        <span
          className={styles.icon}
          onClick={() => setMuted(muted === 1 ? 0 : 1)}
        >
          {muted === 1 ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
        </span>
        <span
          className={classNames(styles.icon, {
            [styles.disabled]: todos.length === 0,
          })}
          onClick={sortHandle}
        >
          {sort ? (
            <FaSortAmountDown size={20} />
          ) : (
            <FaSortAmountDownAlt size={20} />
          )}
        </span>
        <span
          className={classNames(styles.icon, {
            [styles.disabled]: todos.length === 0,
          })}
          onClick={deleteAllHandle}
        >
          <FaTrash size={20} />
        </span>
        <span
          className={classNames(styles.icon)}
          onClick={() => {
            inputFile.current.click();
          }}
        >
          <FaFileUpload size={20} />
        </span>
        <span
          className={classNames(styles.icon, {
            [styles.disabled]: todos.length === 0,
          })}
          onClick={exportDataHandle}
        >
          <FaFileDownload size={20} />
        </span>
      </div>
      <input
        type="file"
        id="file"
        ref={inputFile}
        onChange={handleChange}
        accept=".json"
        style={{ display: "none" }}
      />
    </div>
  );
};
