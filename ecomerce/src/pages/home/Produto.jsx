import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ButtonAdicionar } from "../../components/components-carrinho/ButtonAdicionar";
import { Navbar } from "../../components/Navbar/Navbar";
import styles from "./Produto.module.css";

export function Produto() {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [categoria, setCategoria] = useState(null);

  useEffect(() => {
    const buscarProduto = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/produtos/${id}`);
        setProduto(response.data);
      } catch (error) {
        console.error("Erro ao buscar produto:", error);
      }
    };

    buscarProduto();
  }, [id]);

  useEffect(() => {
    if (produto?.idCategoria) {
      axios.get(`http://localhost:8080/categorias/nome/${produto.idCategoria}`)
        .then((res) => setCategoria(res.data))
        .catch((err) => console.error("Erro ao buscar categoria:", err));
    }
  }, [produto]);

  if (!produto) {
    return <p className={styles.carregando}>Carregando produto...</p>;
  }

  const mostrarPromocao = produto?.precoPromocional !== null && produto?.precoPromocional !== undefined;

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.cardProduto}>
        <div className={styles.painelImagem}>
          <img
            className={styles.imagemProduto}
            src={`http://localhost:8080/produtos/${produto.id}/foto`}
            alt={produto.nome}
          />
          <p className={styles.codigo}><strong>Código:</strong> {produto.id}</p>
        </div>
        <div className={styles.painelInfo}>
          <h3 className={styles.nome}>{produto.nome}</h3>
          <p className={styles.descricao}>{produto.descricao}</p>
          {categoria && <p className={styles.categoria}><strong>Categoria:</strong> {categoria.nome}</p>}
          <p className={styles.fabricante}><strong>Fabricante:</strong> {produto.fabricante}</p>
          {mostrarPromocao ? (
            <p className={styles.precoPromoWrapper}>
              <span className={styles.precoOriginal}>R$ {produto.preco}</span>
              <span className={styles.precoPromocional}>R$ {produto.precoPromocional}</span>
            </p>
          ) : (
            <p className={styles.preco}>R$ {produto.preco}</p>
          )}
          <p className={styles.estoque}>Disponível: {produto.estoque}</p>
          <div className={styles.botaoAdicionar}>
            <ButtonAdicionar idProduto={produto.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
