import axios from "axios";
import { useEffect, useState } from "react";
import { BsCartPlus, BsCartCheckFill } from "react-icons/bs";

export function ButtonAdicionar({ idProduto }) {
  const [adicionado, setAdicionado] = useState(false);
  const token = localStorage.getItem("token");

  const handleClick = async () => {
    if (!token) {
      alert("Você deve estar logado para adicionar ou remover produtos!");
      return;
    }

    if (adicionado) {
      const sucesso = await removerProduto();
      if (sucesso) {
        setAdicionado(false);
      }
    } else {
      const sucesso = await adicionarProduto();
      if (sucesso) {
        setAdicionado(true);
      }
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
      alert("Erro ao adicionar o produto no carrinho!");
      return false;
    }
  };

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
      alert("Produto removido do carrinho!");
      return true;
    } catch (error) {
      alert("Erro ao remover produto do carrinho!");
      return false;
    }
  };

  return (
    <button onClick={handleClick}>
      {adicionado ? <BsCartCheckFill /> : <BsCartPlus />}
    </button>
  );
}
