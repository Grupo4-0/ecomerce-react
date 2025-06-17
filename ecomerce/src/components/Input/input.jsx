import styles from "./input.module.css";

export function Input({ type, placeholder, value, onChange, ...props }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value || ""}
      onChange={onChange}
      className={styles.inputStyle}
      {...props}
    />
  );
}
