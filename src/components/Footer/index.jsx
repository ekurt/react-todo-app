import React from "react";
import styles from "./index.module.css";

export const Footer = () => {
  const priorities = ["normal", "low", "medium", "high"];

  return (
    <>
      <div className={styles.footer}>
        {priorities.map((item, index) => (
          <div key={index} className={[styles.item, styles[item]].join(" ")}>
            {item}
          </div>
        ))}
      </div>
      <div className={styles.footerBottom}>
        <div className={styles.bottomInner}>
          <span>
            To contribute, visit my
            <a
              href="https://github.com/ekurt/react-todo-app"
              target="_blank"
              className={styles.mark}
            >
              github
            </a>
            repo.
          </span>
          <span>
            Visit
            <a href="https://ekurt.dev" target="_blank" className={styles.mark}>
              my website
            </a>
            for my other projects.
          </span>
        </div>
      </div>
    </>
  );
};
