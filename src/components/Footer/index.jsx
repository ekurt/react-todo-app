import React from "react";
import styles from "./index.module.css";

export const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.normal}>
        Normal
      </div>
      <div className={styles.low}>
        Low
      </div>
      <div className={styles.medium}>
        Medium
      </div>
      <div className={styles.high}>
        High
      </div>
    </div>
  );
};
