import styles from "./button.module.css";

export function Button({ type, title, onClick }) {
  return (
    <button className={styles.button} onClick={onClick} type={type}>
      {title}
    </button>
  );
}
