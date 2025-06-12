import styles from "./navbar.module.css";
import { useNavigate } from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className={styles.navbar}>
      <img
        style={{ width: "170px", height: "80px", paddingBottom: "1.5rem" }}
        className={styles.logoImage}
        src="https://biomob.org/_next/image?url=%2FpartnesLogos%2Fserratec_branco.png&w=3840&q=100"
        alt="imagem"
      />
      <ul className={styles.navItens}>
        <li style={{ cursor: "pointer" }} onClick={() => navigate("/about")}>
          sobre
        </li>
        <li onClick={() => navigate("/formulario")}>formulário</li>
        <li>perguntas frequentes</li>
      </ul>
    </nav>
  );
}
