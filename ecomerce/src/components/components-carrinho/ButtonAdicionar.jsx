import axios from "axios";
import { useState } from "react";
import { BsCartPlus } from "react-icons/bs";
import { BsCartCheckFill } from "react-icons/bs";

export function ButtonAdicionar({ idProduto }) {
  const [adicionado, setAdicionado] = useState(false);
  const token = localStorage.getItem("token");

  const handleClick = async () => {
    if (adicionado) {
      const sucesso = await removerProduto();
      if (sucesso) setAdicionado(false);
    } else {
      const sucesso = await adicionarProduto();
      if (sucesso) setAdicionado(true);
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
      alert("Produto adicionado ao carrinho com sucesso!");
      return true;
    } catch (error) {
      alert("Erro ao adicionar produto no carrinho!");
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
      window.location.reload();
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
