import axios from "axios";
import { useState } from "react";
import { BsCartPlus } from "react-icons/bs";
import { BsCartCheckFill } from "react-icons/bs";

export function ButtonAdicionar({ idProduto }) {
  const [adicionado, setAdicionado] = useState(false);
  const token = localStorage.getItem("token");

  const handleClick = async () => {
    const sucesso = await adicionarProduto();
    if (sucesso) {
      window.location.reload(); // ou use um setItens atualizado
    }
  };

  const adicionarProduto = async () => {
    try {
      await axios.post(
        `http://localhost:8080/pedidos/adicionar?idProduto=${idProduto}&quantidade=1`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return true;
    } catch (error) {
      alert("Deve estar logado pra adicionar um produto no carrinho!");
      return false;
    }
  };

  const removerProduto = async () => {
    console.log("Token:", token);
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
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      return true;
    } catch (error) {
      alert("Erro ao remover produto no carrinho!");
      return false;
    }
  };

  return (
    <button onClick={handleClick}>
      {adicionado ? <BsCartCheckFill /> : <BsCartPlus />}
    </button>
  );
}
