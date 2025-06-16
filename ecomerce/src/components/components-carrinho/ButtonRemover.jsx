import { X } from "lucide-react";
import axios from "axios";

export function ButtonRemover({ idProduto }) {
  const token = localStorage.getItem("token");

  const removerProduto = async () => {
    try {
      await axios.delete(
        `http://localhost:8080/pedidos/excluir/item/${idProduto}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Produto removido do carrinho!!");
      window.location.reload();
      return true;
    } catch (error) {
      alert("Erro ao remover produto no carrinho!");
      return false;
    }
  };

  const handleClick = async () => {
    removerProduto();
  };

  return (
    <button onClick={handleClick}>
      <X size="18" />
    </button>
  );
}
