import React from "react";
import styles from "./index.module.css";

export const Footer = () => {
  const priorities = ["normal", "low", "medium", "high"];

  return (
    <div className={styles.footer}>
      {priorities.map((item, index) => (
        <div key={index} className={[styles.item, styles[item]].join(' ')}>
          {item}
        </div>
      ))}
    </div>
  );
};
