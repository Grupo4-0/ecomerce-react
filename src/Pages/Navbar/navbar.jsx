import React from "react";
import styles from "../Navbar/navbar.module.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className={styles.navbar}>
      <div className={styles.logo}> Pet Shop Grupo 4</div>
      <div className={styles.searchBox}>
        <input type="text" placeholder="Pesquisar..." />
      </div>

      <ul className={styles.navItens}>
        <li onClick={() => navigate("/")}>HOME</li>
        <li onClick={() => navigate("/sobre")}>SOBRE</li>
        <li onClick={() => navigate("/login")}>LOGIN</li>
      </ul>
    </header>
  );
};

export default Navbar;
