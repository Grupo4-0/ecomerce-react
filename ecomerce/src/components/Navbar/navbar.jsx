import styles from "./navbar.module.css";
import { useNavigate } from "react-router-dom";
import { ButtonPesquisar } from "../components-header/ButtonPesquisar";
import { CircleUser, Bell, ShoppingBasket } from "lucide-react";
import { ButtonListaCategorias } from "../components-home/ButtonListaCategorias";
import { ButtonEscolher } from "./ButtonEscolher";
import { ButtonCarrinho } from "../components-carrinho/ButtonCarrinho";

export function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>Wardiere</div>

      <ul className={styles.menu}>
        <li><a href="/">Início</a></li>
        <li><a href="/promocoes">Promoções</a></li>
        <li><ButtonListaCategorias /></li>
        <li><a href="/sobre">Quem somos</a></li>
      </ul>

      <div className={styles.pesquisar}>
        <ButtonPesquisar />
      </div>

      <div className={styles.iconeContainer}>
        <ButtonCarrinho />
        <ButtonEscolher />
      </div>
    </nav>
  );
}