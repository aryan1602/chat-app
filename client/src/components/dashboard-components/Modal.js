import React from "react";
import styles from "./modal.module.css";

const Modal = (props) => {
  return (
    <div id="myModal" className={styles.modal}>
      <div className={styles["modal-content"]}>{props.children}</div>
    </div>
  );
};

export default Modal;
