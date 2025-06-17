import { ShoppingBasket } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./ButtonCarrinho.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

export function ButtonCarrinho() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setProdutos([]);
      return;
    }

    const fetchPedidoAtual = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/pedidos/atual",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const pedidos = response.data;
        const pedido = pedidos[0];
        setProdutos(pedido?.itens || []);
      } catch (error) {
        console.error("Erro ao buscar pedido atual:", error);
        setProdutos([]);
      }
    };

    fetchPedidoAtual();
  }, []);

  const quantidade = produtos.length;

  return (
    <Link to="/carrinho" className={styles.container}>
      <ShoppingBasket className={styles.icone} />
      {quantidade > 0 && <span className={styles.badge}>{quantidade}</span>}
    </Link>
  );
}
