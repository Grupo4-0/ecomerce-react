import { useState, useEffect } from "react";
import axios from "axios";
import { ButtonAdicionar } from "../components-carrinho/ButtonAdicionar";

export function Card({
  idProduto,
  nome,
  descricao,
  idCategoria,
  preco,
  precoPromocional,
  estoque,
  fabricante,
}) {
  const [produto, setProduto] = useState({
    idProduto,
    nome,
    descricao,
    categoria: null,
    preco,
    precoPromocional,
    estoque,
    fabricante,
  });

  const temPromocao = precoPromocional !== null;
  const [mostrarPromocao] = useState(temPromocao);

  // Buscar categoria
  useEffect(() => {
    axios
      .get(`http://localhost:8080/categorias/${idCategoria}`)
      .then((response) => {
        setProduto((prevProduto) => ({
          ...prevProduto,
          categoria: response.data,
        }));
      })
      .catch((error) => {
        console.error("Erro ao buscar categoria:", error);
      });
  }, [idCategoria]);

  return (
    <div>
      <p>Código: {produto.idProduto} </p>
      <img src={`http://localhost:8080/produtos/${idProduto}/foto`} alt={produto.nome}/>
      <h3>{produto.nome}</h3>
      <p>{produto.descricao}</p>
      <p>{produto.fabricante}</p>
      <p>Categoria: {produto.categoria}</p>

      {mostrarPromocao ? (
        <div>
          <p>Preço: R$ {produto.preco}</p>
          <p>Promoção: R$ {produto.precoPromocional}</p>
        </div>
      ) : (
        <div>
          <p>Preço: R$ {produto.preco}</p>
        </div>
      )}

      <p>Quantidade: {produto.estoque}</p>
      <ButtonAdicionar />
    </div>
  );
}
