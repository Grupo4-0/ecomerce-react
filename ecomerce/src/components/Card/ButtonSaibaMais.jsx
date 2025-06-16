import axios from "axios";
import { useState, useEffect } from "react";
import { ButtonAdicionar } from "../components-carrinho/ButtonAdicionar";
import styles from "./ButtonSaibaMais.module.css";

export function ButtonSaibaMais({ idProduto }) {
  const [produto, setProduto] = useState(null);
  const [categoria, setCategoria] = useState(null);
  const [mostrarDetalhes, setMostrarDetalhes] = useState(false);

  const buscarProduto = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/produtos/${idProduto}`);
      setProduto(response.data);
      setMostrarDetalhes(true);
    } catch (error) {
      console.error("Erro ao buscar produto:", error);
    }
  };

  useEffect(() => {
    const buscarCategoria = async () => {
      if (produto?.idCategoria) {
        try {
          const response = await axios.get(`http://localhost:8080/categorias/nome/${produto.idCategoria}`);
          setCategoria(response.data);
        } catch (error) {
          console.error("Erro ao buscar categoria:", error);
        }
      }
    };
    buscarCategoria();
  }, [produto]);

  const mostrarPromocao = produto?.precoPromocional !== null && produto?.precoPromocional !== undefined;

  return (
    <div>
      <button className={styles.botaoAbrir} onClick={buscarProduto}>Saiba mais...</button>

      {mostrarDetalhes && produto && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <button className={styles.botaoFechar} onClick={() => setMostrarDetalhes(false)}>X</button>
            <div className={styles.modalContent}>
              <div className={styles.painelEsquerdo}>
                <img
                  className={styles.imagemProduto}
                  src={`http://localhost:8080/produtos/${produto.id}/foto`}
                  alt={produto.nome}
                />
                <p className={styles.codigoProduto}><strong>Código:</strong> {produto.id}</p>
              </div>
              <div className={styles.painelDireito}>
                <h3 className={styles.nomeProduto}>{produto.nome}</h3>
                <p className={styles.descricao}>{produto.descricao}</p>
                {categoria && <p className={styles.categoria}><strong>Categoria:</strong> {categoria.nome}</p>}
                <p className={styles.fabricante}><strong>Fabricante:</strong> {produto.fabricante}</p>

                {mostrarPromocao ? (
                  <p className={styles.promocao}>
                    <del>R$ {produto.preco}</del>{" "}
                    <strong>R$ {produto.precoPromocional}</strong>
                  </p>
                ) : (
                  <p className={styles.preco}><strong>R$ {produto.preco}</strong></p>
                )}

                <p className={styles.estoque}>Disponível: {produto.estoque}</p>
                <div className={styles.adicionarBtn}>
                  <ButtonAdicionar idProduto={produto.id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
