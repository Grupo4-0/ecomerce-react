import { useState, useEffect } from "react";
import style from "./card.module.css";
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

  useEffect(() => {
    const buscarCategoria = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/categorias/nome/${idCategoria}`
        );
        setProduto((prevProduto) => ({
          ...prevProduto,
          categoria: response.data,
        }));
      } catch (error) {
        console.error("Erro ao buscar categoria:", error);
      }
    };

    if (idCategoria) {
      buscarCategoria();
    }
  }, [idCategoria]);

  return (
    <div className={style["card-produto"]}>
      <p className={style.codigo}>Código: {produto.idProduto}</p>
      <img
        src={`http://localhost:8080/produtos/${idProduto}/foto`}
        alt={produto.nome}
      />
      <h3>{produto.nome}</h3>
      <p className={style.descricao}>{produto.descricao}</p>
      <p className={style.fabricante}>{produto.fabricante}</p>
      <p className={style.categoria}>
        {produto.categoria ? produto.categoria : "Carregando categoria..."}
      </p>

      {mostrarPromocao ? (
        <div className={style.preco}>
          <span className={style.precoOriginal}>R$ {produto.preco}</span>
          <span className={style.precoPromocional}>
            R$ {produto.precoPromocional}
          </span>
        </div>
      ) : (
        <div className={style.preco}>R$ {produto.preco}</div>
      )}

      <p className={style.estoque}>Disponível: {produto.estoque}</p>

      <div className={style.botaoAdicionar}>
        <ButtonAdicionar idProduto={produto.idProduto} />
      </div>
    </div>
  );
}